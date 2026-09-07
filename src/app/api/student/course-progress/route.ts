import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const courseLegacyId = Number(request.nextUrl.searchParams.get("courseLegacyId"));
    if (!Number.isInteger(courseLegacyId) || courseLegacyId <= 0) {
      return NextResponse.json({ error: "A valid courseLegacyId is required." }, { status: 400 });
    }

    const enrollment = await prisma.enrollments.findFirst({
      where: {
        studentId: user.id,
        courses: { legacyId: courseLegacyId },
      },
      include: {
        courses: {
          include: {
            course_modules: {
              orderBy: { orderIndex: "asc" },
              include: {
                lessons: {
                  orderBy: { orderIndex: "asc" },
                  include: {
                    lesson_progress: {
                      where: { userId: user.id },
                      select: { isCompleted: true, progress: true, watchTime: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "You are not enrolled in this course." }, { status: 403 });
    }

    const lessons = enrollment.courses.course_modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        moduleId: module.id,
        moduleTitle: module.title,
        title: lesson.title,
        orderIndex: lesson.orderIndex,
        isCompleted: lesson.lesson_progress[0]?.isCompleted ?? false,
        progress: lesson.lesson_progress[0]?.progress ?? 0,
        watchTime: lesson.lesson_progress[0]?.watchTime ?? 0,
      }))
    );

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment.id,
      courseId: enrollment.courses.id,
      courseLegacyId,
      courseProgress: enrollment.progress,
      status: enrollment.status,
      totalLessons: lessons.length,
      completedLessons: lessons.filter((lesson) => lesson.isCompleted).length,
      lessons,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return NextResponse.json({ error: "Failed to fetch course progress." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const courseLegacyId = Number(body?.courseLegacyId);
    const lessonId = Number(body?.lessonId);
    const isCompleted = Boolean(body?.isCompleted);

    if (!Number.isInteger(courseLegacyId) || !Number.isInteger(lessonId)) {
      return NextResponse.json({ error: "Valid courseLegacyId and lessonId are required." }, { status: 400 });
    }

    const enrollment = await prisma.enrollments.findFirst({
      where: {
        studentId: user.id,
        courses: { legacyId: courseLegacyId },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "You are not enrolled in this course." }, { status: 403 });
    }

    const lesson = await prisma.lessons.findFirst({
      where: {
        id: lessonId,
        course_modules: { courseId: enrollment.courseId },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson does not belong to this course." }, { status: 404 });
    }

    await prisma.lesson_progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollment.id,
          lessonId,
        },
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        userId: user.id,
        isCompleted,
        progress: isCompleted ? 100 : 0,
        completedAt: isCompleted ? new Date() : null,
        lastWatchedAt: new Date(),
      },
      update: {
        isCompleted,
        progress: isCompleted ? 100 : 0,
        completedAt: isCompleted ? new Date() : null,
        lastWatchedAt: new Date(),
      },
    });

    const totalLessons = await prisma.lessons.count({
      where: { course_modules: { courseId: enrollment.courseId } },
    });
    const completedLessons = await prisma.lesson_progress.count({
      where: {
        enrollmentId: enrollment.id,
        isCompleted: true,
      },
    });

    const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const status = courseProgress === 100 ? "completed" : "active";

    await prisma.enrollments.update({
      where: { id: enrollment.id },
      data: {
        progress: courseProgress,
        status,
        lastAccessedAt: new Date(),
        completedAt: courseProgress === 100 ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      courseProgress,
      completedLessons,
      totalLessons,
      status,
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return NextResponse.json({ error: "Failed to update course progress." }, { status: 500 });
  }
}

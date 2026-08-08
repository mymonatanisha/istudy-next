import { NextRequest, NextResponse } from "@/lib/next-response";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { flutterRoadmap } from "@/data/courses/flutter-course-data";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to view your enrollments." },
        { status: 401 }
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            price: true,
            lessons: true,
            instructorName: true,
            instructorAvatar: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      enrollments: enrollments.map((enrollment) => ({
        id: enrollment.id,
        courseName: enrollment.course.title,
        courseSlug: enrollment.course.slug,
        instructor: enrollment.course.instructorName,
        instructorAvatar: enrollment.course.instructorAvatar,
        thumbnail: enrollment.course.thumbnail,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress,
        status: enrollment.status,
        lastAccessedAt: enrollment.lastAccessedAt,
        completedAt: enrollment.completedAt,
        lessons: enrollment.course.lessons,
        price: enrollment.course.price,
      })),
      total: enrollments.length,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch enrollments. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

function getFlutterRoadmapLessons() {
  return flutterRoadmap.flatMap((section) =>
    section.lectures.map((lecture) => ({
      moduleTitle: section.title,
      lessonTitle: lecture.title,
      duration: lecture.duration,
    }))
  );
}

async function provisionFlutterRoadmap(courseId: number) {
  const roadmap = getFlutterRoadmapLessons();
  const existingModules = await prisma.courseModule.count({ where: { courseId } });
  if (existingModules > 0) return;

  for (let moduleIndex = 0; moduleIndex < flutterRoadmap.length; moduleIndex++) {
    const section = flutterRoadmap[moduleIndex];
    const module = await prisma.courseModule.create({
      data: {
        courseId,
        title: section.title,
        orderIndex: moduleIndex + 1,
        isPublished: true,
        lessons: {
          create: section.lectures.map((lecture, lessonIndex) => ({
            title: lecture.title,
            contentType: "video",
            duration: undefined,
            orderIndex: lessonIndex + 1,
            isFree: true,
            isPublished: true,
          })),
        },
      },
    });

    // Keep TypeScript aware that the roadmap is the source for the provisioned lessons.
    void module;
  }

  // The roadmap currently contains 45 lessons. Keep the course counter in sync.
  await prisma.course.update({
    where: { id: courseId },
    data: { lessons: roadmap.length },
  });
}

/**
 * POST /api/student/enrollments
 * Enroll the authenticated student in a free course.
 * Body: { courseLegacyId: number }
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to enroll in this course." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const courseLegacyId = Number(body?.courseLegacyId);
    if (!Number.isInteger(courseLegacyId) || courseLegacyId <= 0) {
      return NextResponse.json(
        { error: "A valid courseLegacyId is required." },
        { status: 400 }
      );
    }

    let course = await prisma.course.findFirst({
      where: { legacyId: courseLegacyId },
    });

    if (!course && courseLegacyId === 36) {
      course = await prisma.course.create({
        data: {
          title: "Flutter App Development",
          slug: "flutter-app-development",
          courseTag: "Free Course",
          badge: "FREE",
          badgeClass: "badge-primary",
          instructorName: "Enamul Huq",
          lessons: 45,
          students: 0,
          rating: 5,
          price: 0,
          courseDescription:
            "Learn Flutter and Dart step by step and build real-world mobile applications from the fundamentals to app deployment.",
          shortDescription:
            "Beginner to Advanced Flutter App Development course.",
          thumbnail: "/assets/images/course/course-bg-2.webp",
          coverImage: "/assets/images/course/course-bg-2.webp",
          status: "published",
          legacyId: 36,
          isLegacy: true,
          publishedAt: new Date(),
        },
      });
    }

    if (!course) {
      return NextResponse.json(
        { error: "Course is not available in the enrollment system yet." },
        { status: 404 }
      );
    }

    if (course.price !== 0) {
      return NextResponse.json(
        { error: "This endpoint is only available for free courses." },
        { status: 400 }
      );
    }

    await provisionFlutterRoadmap(course.id);

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: user.id,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        alreadyEnrolled: true,
        enrollmentId: existingEnrollment.id,
        message: "You are already enrolled in this course.",
      });
    }

    const enrollment = await prisma.$transaction(async (tx) => {
      const createdEnrollment = await tx.enrollment.create({
        data: {
          studentId: user.id,
          courseId: course.id,
          status: "active",
          progress: 0,
          enrolledAt: new Date(),
          lastAccessedAt: new Date(),
        },
      });

      await tx.course.update({
        where: { id: course.id },
        data: { students: { increment: 1 } },
      });

      return createdEnrollment;
    });

    return NextResponse.json(
      {
        success: true,
        alreadyEnrolled: false,
        enrollmentId: enrollment.id,
        courseId: enrollment.courseId,
        message: "Successfully enrolled in the free course.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating free enrollment:", error);
    return NextResponse.json(
      {
        error: "Failed to enroll in the course.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

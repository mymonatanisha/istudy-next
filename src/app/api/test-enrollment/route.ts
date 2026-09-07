import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/test-enrollment
 * Manual enrollment creation for testing purposes
 * Body: { userId: number, courseId: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, courseId } = body;

    // Validate input
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "Missing required fields: userId and courseId are required" },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found` },
        { status: 404 }
      );
    }

    // Validate course exists
    const course = await prisma.courses.findUnique({
      where: { id: Number(courseId) },
      select: { 
        id: true, 
        title: true, 
        slug: true, 
        price: true, 
        students: true,
        instructorName: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: `Course with ID ${courseId} not found` },
        { status: 404 }
      );
    }

    // Check for duplicate enrollment
    const existingEnrollment = await prisma.enrollments.findUnique({
      where: {
        studentId_courseId: {
          studentId: Number(userId),
          courseId: Number(courseId),
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { 
          error: "Duplicate enrollment",
          message: `User ${user.name} is already enrolled in course "${course.title}"`,
          enrollmentId: existingEnrollment.id,
        },
        { status: 409 }
      );
    }

    // Create enrollment in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create enrollment
      const enrollment = await tx.enrollments.create({
        data: {
          studentId: Number(userId),
          courseId: Number(courseId),
          status: "active",
          progress: 0,
          enrolledAt: new Date(),
          lastAccessedAt: new Date(),
        },
        include: {
          courses: {
            select: {
              title: true,
              slug: true,
              instructorName: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // Increment course student count
      await tx.courses.update({
        where: { id: Number(courseId) },
        data: {
          students: {
            increment: 1,
          },
        },
      });

      return enrollment;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enrollment created successfully",
        enrollment: {
          id: result.id,
          student: {
            id: result.studentId,
            name: result.user.name,
            email: result.user.email,
          },
          course: {
            id: result.courseId,
            title: result.courses.title,
            slug: result.courses.slug,
            instructor: result.courses.instructorName,
          },
          status: result.status,
          progress: result.progress,
          enrolledAt: result.enrolledAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      {
        error: "Failed to create enrollment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

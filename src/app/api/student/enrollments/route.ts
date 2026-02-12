import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

/**
 * GET /api/student/enrollments
 * Fetch authenticated user's course enrollments
 */
export async function GET() {
  try {
    // Verify user session
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to view your enrollments." },
        { status: 401 }
      );
    }

    // Fetch enrollments with course details
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: user.id,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            instructorName: true,
            instructorAvatar: true,
            thumbnail: true,
            rating: true,
            lessons: true,
            price: true,
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    // Format response data
    const formattedEnrollments = enrollments.map((enrollment) => ({
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
      rating: enrollment.course.rating,
      lessons: enrollment.course.lessons,
      price: enrollment.course.price,
    }));

    return NextResponse.json({
      success: true,
      enrollments: formattedEnrollments,
      total: formattedEnrollments.length,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch enrollments. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

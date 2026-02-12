import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/enrollments
 * List all enrollments with pagination and filters
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');
    const statusFilter = searchParams.get('status') || '';

    const skip = (page - 1) * perPage;

    // Build where clause
    const where: any = {};
    
    if (statusFilter) {
      where.status = statusFilter;
    }

    // Fetch enrollments with related data
    const [enrollments, totalCount] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { enrolledAt: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          },
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
              price: true,
              instructorName: true,
              instructorAvatar: true,
            }
          },
          order: {
            select: {
              id: true,
              transactionId: true,
              paymentMethod: true,
              createdAt: true,
            }
          }
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    // Format enrollment data
    const formattedEnrollments = enrollments.map(enrollment => ({
      id: enrollment.id,
      student: {
        id: enrollment.student.id,
        name: enrollment.student.name,
        email: enrollment.student.email,
        avatar: enrollment.student.avatar,
      },
      course: {
        id: enrollment.course.id,
        title: enrollment.course.title,
        slug: enrollment.course.slug,
        thumbnail: enrollment.course.thumbnail,
        price: enrollment.course.price,
        instructor: enrollment.course.instructorName,
        instructorAvatar: enrollment.course.instructorAvatar,
      },
      order: enrollment.order,
      status: enrollment.status,
      progress: enrollment.progress,
      enrolledAt: enrollment.enrolledAt,
      lastAccessedAt: enrollment.lastAccessedAt,
      completedAt: enrollment.completedAt,
      expiresAt: enrollment.expiresAt,
    }));

    return NextResponse.json({
      success: true,
      enrollments: formattedEnrollments,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      }
    });

  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch enrollments.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

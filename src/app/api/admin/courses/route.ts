import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/courses
 * List all courses with pagination, search, and filters
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
    const search = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || '';

    const skip = (page - 1) * perPage;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { instructorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (statusFilter) {
      where.status = statusFilter;
    }

    // Fetch courses with related data
    const [courses, totalCount] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          },
          _count: {
            select: {
              enrollments: true,
            }
          }
        },
      }),
      prisma.course.count({ where }),
    ]);

    // Format course data with revenue calculation
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Calculate revenue
        const enrollmentCount = course._count.enrollments;
        const courseRevenue = enrollmentCount * course.price;

        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          instructor: course.instructor?.name || course.instructorName,
          instructorAvatar: course.instructor?.avatar || course.instructorAvatar,
          instructorId: course.instructorId,
          price: course.price,
          oldPrice: course.oldPrice,
          students: enrollmentCount,
          revenue: courseRevenue,
          status: course.status,
          rating: course.rating,
          lessons: course.lessons,
          featured: course.featured,
          publishedAt: course.publishedAt,
          createdAt: course.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      courses: formattedCourses,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      }
    });

  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch courses.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

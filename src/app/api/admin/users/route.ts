import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/users
 * List all users with pagination, search, and filters
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
    const roleFilter = searchParams.get('role') || '';

    const skip = (page - 1) * perPage;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (roleFilter) {
      where.role_id = parseInt(roleFilter);
    }

    // Fetch users with related data
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          role: true,
          enrollments: {
            include: {
              course: {
                select: { price: true }
              }
            }
          },
          _count: {
            select: {
              enrollments: true,
            }
          }
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Format user data with calculations
    const formattedUsers = users.map(user => {
      const totalSpent = user.enrollments.reduce(
        (sum, enrollment) => sum + (enrollment.course?.price || 0),
        0
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role?.name || 'User',
        roleId: user.role_id,
        enrolledCourses: user._count.enrollments,
        totalSpent,
        createdAt: user.createdAt,
        phone: user.phone,
        occupation: user.occupation,
      };
    });

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      }
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch users.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

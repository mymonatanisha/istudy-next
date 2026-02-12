import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/users/[id]
 * Get detailed user information
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Fetch user with all related data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                thumbnail: true,
                price: true,
                instructorName: true,
              }
            },
            order: {
              select: {
                id: true,
                status: true,
                paymentMethod: true,
                transactionId: true,
                createdAt: true,
              }
            }
          },
          orderBy: { enrolledAt: 'desc' }
        },
        instructorProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate total spent
    const totalSpent = user.enrollments.reduce(
      (sum, enrollment) => sum + (enrollment.course?.price || 0),
      0
    );

    // Format response
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      phone: user.phone,
      address: user.address,
      linkedIn: user.linkedIn,
      bio: user.bio,
      occupation: user.occupation,
      headline: user.headline,
      role: user.role?.name || 'User',
      roleId: user.role_id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      enrollments: user.enrollments.map(e => ({
        id: e.id,
        course: {
          id: e.course.id,
          title: e.course.title,
          slug: e.course.slug,
          thumbnail: e.course.thumbnail,
          price: e.course.price,
          instructor: e.course.instructorName,
        },
        status: e.status,
        progress: e.progress,
        enrolledAt: e.enrolledAt,
        completedAt: e.completedAt,
        order: e.order,
      })),
      instructorProfile: user.instructorProfile,
      stats: {
        totalEnrollments: user.enrollments.length,
        totalSpent,
        completedCourses: user.enrollments.filter(e => e.status === 'completed').length,
        activeCourses: user.enrollments.filter(e => e.status === 'active').length,
      }
    };

    return NextResponse.json({
      success: true,
      user: formattedUser,
    });

  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch user details.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

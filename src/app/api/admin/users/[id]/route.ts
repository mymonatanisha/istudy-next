import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

export async function GET(
  request: NextRequest,
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

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        roles: {
          select: { id: true, name: true },
        },
        instructor_profiles: true,
        enrollments: {
          include: {
            courses: {
              select: {
                id: true,
                title: true,
                slug: true,
                price: true,
              },
            },
            orders: {
              select: {
                id: true,
                status: true,
                paymentMethod: true,
                transactionId: true,
                createdAt: true,
              },
            },
          },
          orderBy: { enrolledAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate total spent
    let totalSpent = 0;
    for (const enrollment of user.enrollments) {
      totalSpent += Number(enrollment.courses?.price || 0);
    }

    // Format response (schema-correct fields only)
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
      roleId: user.role_id,
      role: user.roles?.name || null,
      createdAt: user.createdAt,
      totalSpent,
      enrollments: user.enrollments.map((enrollment) => ({
        id: enrollment.id,
        status: enrollment.status,
        progress: enrollment.progress,
        enrolledAt: enrollment.enrolledAt,
        lastAccessedAt: enrollment.lastAccessedAt,
        completedAt: enrollment.completedAt,
        expiresAt: enrollment.expiresAt,
        course: enrollment.courses,
        order: enrollment.orders,
      })),
      instructorProfile: user.instructor_profiles,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

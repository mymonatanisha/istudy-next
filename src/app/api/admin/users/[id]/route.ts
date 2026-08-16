import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                image: true,
              },
            },
            progress: true,
            order: {
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
        instructorProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate total spent without relying on a generic type argument on an untyped Prisma result.
    let totalSpent = 0;
    for (const enrollment of user.enrollments) {
      totalSpent += Number(enrollment.course?.price || 0);
    }

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
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      totalSpent,
      enrollments: user.enrollments,
      instructorProfile: user.instructorProfile,
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

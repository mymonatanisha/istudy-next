import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

/**
 * GET /api/student/purchases
 * Returns authenticated user's purchase history as:
 * [{ course, price, paymentStatus, date }]
 */
export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to view your purchase history." },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        enrollment: {
          include: {
            course: {
              select: {
                title: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const purchases = orders.map((order) => ({
      course: order.enrollment?.course?.title ?? `Course (${order.courseId})`,
      price: order.enrollment?.course?.price ?? 0,
      paymentStatus: order.status,
      date: order.createdAt,
    }));

    return NextResponse.json({
      success: true,
      purchases,
      total: purchases.length,
    });
  } catch (error) {
    console.error("Error fetching student purchase history:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch purchase history. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/revenue
 * Get revenue statistics and aggregations
 */
export async function GET() {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    // Fetch all completed orders
    const completedOrders = await prisma.orders.findMany({
      where: { status: 'completed' },
      include: {
        enrollments: {
          include: {
            courses: {
              select: { 
                id: true,
                title: true,
                price: true,
                instructorId: true,
                instructorName: true,
              },
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });

    type CompletedOrder = (typeof completedOrders)[number];

    // Calculate total revenue
    const totalRevenue = completedOrders.reduce((sum: number, order: CompletedOrder) => {
      return sum + Number(order.enrollments?.courses?.price || 0);
    }, 0);

    // Calculate platform fee (assuming 20% commission)
    const platformCommission = 0.2;
    const platformFee = totalRevenue * platformCommission;
    const instructorShare = totalRevenue * (1 - platformCommission);

    // Calculate average order value
    const averageOrderValue = completedOrders.length > 0 
      ? totalRevenue / completedOrders.length 
      : 0;

    // Group revenue by month (last 12 months)
    const monthlyRevenue: { month: string; revenue: number }[] = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const monthOrders = completedOrders.filter((order: CompletedOrder) => {
        const orderMonth = order.createdAt.toISOString().slice(0, 7);
        return orderMonth === monthKey;
      });
      
      const monthRevenue = monthOrders.reduce((sum: number, order: CompletedOrder) => {
        return sum + Number(order.enrollments?.courses?.price || 0);
      }, 0);
      
      monthlyRevenue.push({
        month: monthName,
        revenue: monthRevenue,
      });
    }

    // Top 10 courses by revenue
    const courseRevenueMap = new Map<number, { title: string; revenue: number; students: number }>();
    
    completedOrders.forEach((order: CompletedOrder) => {
      if (order.enrollments?.courses) {
        const courseId = order.enrollments.courses.id;
        const existing = courseRevenueMap.get(courseId);
        const price = Number(order.enrollments.courses.price);
        
        if (existing) {
          existing.revenue += price;
          existing.students += 1;
        } else {
          courseRevenueMap.set(courseId, {
            title: order.enrollments.courses.title,
            revenue: price,
            students: 1,
          });
        }
      }
    });
    
    const topCourses = Array.from(courseRevenueMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Top 10 instructors by earnings
    const instructorEarningsMap = new Map<number, { name: string; earnings: number; courses: Set<number>; students: number }>();
    
    completedOrders.forEach((order: CompletedOrder) => {
      if (order.enrollments?.courses?.instructorId) {
        const instructorId = order.enrollments.courses.instructorId;
        const existing = instructorEarningsMap.get(instructorId);
        const price = Number(order.enrollments.courses.price);
        const instructorEarning = price * (1 - platformCommission);
        const instructorName = order.enrollments.courses.user?.name || order.enrollments.courses.instructorName || 'Unknown';
        
        if (existing) {
          existing.earnings += instructorEarning;
          existing.courses.add(order.enrollments.courses.id);
          existing.students += 1;
        } else {
          instructorEarningsMap.set(instructorId, {
            name: instructorName,
            earnings: instructorEarning,
            courses: new Set([order.enrollments.courses.id]),
            students: 1,
          });
        }
      }
    });
    
    const topInstructors = Array.from(instructorEarningsMap.entries())
      .map(([id, data]) => ({ 
        id, 
        name: data.name,
        earnings: data.earnings,
        coursesCount: data.courses.size,
        studentsCount: data.students,
      }))
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: completedOrders.length,
        averageOrderValue,
        platformFee,
        instructorShare,
        platformCommission: platformCommission * 100, // as percentage
      },
      charts: {
        monthlyRevenue,
      },
      topCourses,
      topInstructors,
    });

  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch revenue statistics.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

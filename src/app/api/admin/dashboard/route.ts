import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/dashboard
 * Fetch dashboard statistics for admin panel
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

    // Calculate date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch total users
    const totalUsers = await prisma.user.count();
    const usersThisMonth = await prisma.user.count({
      where: { createdAt: { gte: startOfMonth } }
    });
    const usersLastMonth = await prisma.user.count({
      where: { 
        createdAt: { 
          gte: startOfLastMonth,
          lt: startOfMonth
        } 
      }
    });
    const userTrend = usersLastMonth > 0 
      ? ((usersThisMonth - usersLastMonth) / usersLastMonth * 100).toFixed(1)
      : 0;

    // Fetch total courses
    const totalCourses = await prisma.course.count({
      where: { status: 'published' }
    });
    const coursesThisMonth = await prisma.course.count({
      where: { 
        status: 'published',
        publishedAt: { gte: startOfMonth } 
      }
    });
    const coursesLastMonth = await prisma.course.count({
      where: { 
        status: 'published',
        publishedAt: { 
          gte: startOfLastMonth,
          lt: startOfMonth
        } 
      }
    });
    const courseTrend = coursesLastMonth > 0
      ? ((coursesThisMonth - coursesLastMonth) / coursesLastMonth * 100).toFixed(1)
      : 0;

    // Fetch orders for revenue calculation
    const completedOrders = await prisma.order.findMany({
      where: { status: 'completed' },
      include: {
        enrollment: {
          include: {
            course: {
              select: { price: true }
            }
          }
        }
      }
    });

    const totalRevenue = completedOrders.reduce((sum, order) => {
      return sum + (order.enrollment?.course?.price || 0);
    }, 0);

    const ordersThisMonth = completedOrders.filter(
      order => order.createdAt >= startOfMonth
    );
    const revenueThisMonth = ordersThisMonth.reduce((sum, order) => {
      return sum + (order.enrollment?.course?.price || 0);
    }, 0);

    const ordersLastMonth = completedOrders.filter(
      order => order.createdAt >= startOfLastMonth && order.createdAt < startOfMonth
    );
    const revenueLastMonth = ordersLastMonth.reduce((sum, order) => {
      return sum + (order.enrollment?.course?.price || 0);
    }, 0);

    const revenueTrend = revenueLastMonth > 0
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth * 100).toFixed(1)
      : 0;

    // Fetch active enrollments
    const activeEnrollments = await prisma.enrollment.count({
      where: { status: 'active' }
    });
    const enrollmentsThisMonth = await prisma.enrollment.count({
      where: { 
        status: 'active',
        enrolledAt: { gte: startOfMonth } 
      }
    });
    const enrollmentsLastMonth = await prisma.enrollment.count({
      where: { 
        status: 'active',
        enrolledAt: { 
          gte: startOfLastMonth,
          lt: startOfMonth
        } 
      }
    });
    const enrollmentTrend = enrollmentsLastMonth > 0
      ? ((enrollmentsThisMonth - enrollmentsLastMonth) / enrollmentsLastMonth * 100).toFixed(1)
      : 0;

    // Fetch recent orders for activity table
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, email: true }
            },
            course: {
              select: { title: true, price: true }
            }
          }
        }
      }
    });

    const formattedRecentOrders = recentOrders.map(order => ({
      id: order.id,
      orderId: `#ORD-${order.id.toString().padStart(6, '0')}`,
      customerName: order.enrollment?.student?.name || order.fullName,
      customerEmail: order.enrollment?.student?.email || order.email,
      courseTitle: order.enrollment?.course?.title || 'N/A',
      amount: order.enrollment?.course?.price || 0,
      status: order.status,
      date: order.createdAt,
    }));

    // Revenue chart data (last 30 days)
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const revenueByDay = await prisma.order.findMany({
      where: {
        status: 'completed',
        createdAt: { gte: thirtyDaysAgo }
      },
      include: {
        enrollment: {
          include: {
            course: {
              select: { price: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Group by day
    const revenueChartData: { date: string; revenue: number }[] = [];
    const dayMap = new Map<string, number>();

    revenueByDay.forEach(order => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      const revenue = order.enrollment?.course?.price || 0;
      dayMap.set(dateKey, (dayMap.get(dateKey) || 0) + revenue);
    });

    // Fill in all days
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      revenueChartData.push({
        date: dateKey,
        revenue: dayMap.get(dateKey) || 0
      });
    }

    // User growth chart data (last 30 days)
    const usersByDay = await prisma.user.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    const userGrowthData: { date: string; users: number }[] = [];
    const userDayMap = new Map<string, number>();

    usersByDay.forEach(user => {
      const dateKey = user.createdAt.toISOString().split('T')[0];
      userDayMap.set(dateKey, (userDayMap.get(dateKey) || 0) + 1);
    });

    // Cumulative count
    let cumulativeUsers = totalUsers - usersByDay.length;
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      cumulativeUsers += userDayMap.get(dateKey) || 0;
      userGrowthData.push({
        date: dateKey,
        users: cumulativeUsers
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          thisMonth: usersThisMonth,
          trend: parseFloat(userTrend.toString()),
        },
        courses: {
          total: totalCourses,
          thisMonth: coursesThisMonth,
          trend: parseFloat(courseTrend.toString()),
        },
        revenue: {
          total: totalRevenue,
          thisMonth: revenueThisMonth,
          trend: parseFloat(revenueTrend.toString()),
        },
        enrollments: {
          total: activeEnrollments,
          thisMonth: enrollmentsThisMonth,
          trend: parseFloat(enrollmentTrend.toString()),
        },
      },
      recentOrders: formattedRecentOrders,
      charts: {
        revenue: revenueChartData,
        userGrowth: userGrowthData,
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch dashboard statistics.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/dashboard
 * Fetch dashboard statistics for admin panel
 */
export async function GET() {
  try {
    const adminUser = await getAdminUser();
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const totalUsers = await prisma.user.count();
    const usersThisMonth = await prisma.user.count({ where: { createdAt: { gte: startOfMonth } } });
    const usersLastMonth = await prisma.user.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } });
    const userTrend = usersLastMonth > 0 ? ((usersThisMonth - usersLastMonth) / usersLastMonth * 100).toFixed(1) : 0;

    const totalCourses = await prisma.courses.count({ where: { status: 'published' } });
    const coursesThisMonth = await prisma.courses.count({ where: { status: 'published', publishedAt: { gte: startOfMonth } } });
    const coursesLastMonth = await prisma.courses.count({ where: { status: 'published', publishedAt: { gte: startOfLastMonth, lt: startOfMonth } } });
    const courseTrend = coursesLastMonth > 0 ? ((coursesThisMonth - coursesLastMonth) / coursesLastMonth * 100).toFixed(1) : 0;

    const completedOrders = await prisma.orders.findMany({
      where: { status: 'completed' },
      include: { enrollments: { include: { courses: { select: { price: true } } } } }
    });
    type CompletedOrder = (typeof completedOrders)[number];
    const totalRevenue = completedOrders.reduce((sum: number, order: CompletedOrder) => sum + Number(order.enrollments?.courses?.price || 0), 0);
    const ordersThisMonth = completedOrders.filter((order: CompletedOrder) => order.createdAt >= startOfMonth);
    const revenueThisMonth = ordersThisMonth.reduce((sum: number, order: CompletedOrder) => sum + Number(order.enrollments?.courses?.price || 0), 0);
    const ordersLastMonth = completedOrders.filter((order: CompletedOrder) => order.createdAt >= startOfLastMonth && order.createdAt < startOfMonth);
    const revenueLastMonth = ordersLastMonth.reduce((sum: number, order: CompletedOrder) => sum + Number(order.enrollments?.courses?.price || 0), 0);
    const revenueTrend = revenueLastMonth > 0 ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth * 100).toFixed(1) : 0;

    const activeEnrollments = await prisma.enrollments.count({ where: { status: 'active' } });
    const enrollmentsThisMonth = await prisma.enrollments.count({ where: { status: 'active', enrolledAt: { gte: startOfMonth } } });
    const enrollmentsLastMonth = await prisma.enrollments.count({ where: { status: 'active', enrolledAt: { gte: startOfLastMonth, lt: startOfMonth } } });
    const enrollmentTrend = enrollmentsLastMonth > 0 ? ((enrollmentsThisMonth - enrollmentsLastMonth) / enrollmentsLastMonth * 100).toFixed(1) : 0;

    const recentOrders = await prisma.orders.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        enrollments: {
          include: {
            user: { select: { name: true, email: true } },
            courses: { select: { title: true, price: true } }
          }
        }
      }
    });
    type RecentOrder = (typeof recentOrders)[number];
    const formattedRecentOrders = recentOrders.map((order: RecentOrder) => ({
      id: order.id,
      orderId: `#ORD-${order.id.toString().padStart(6, '0')}`,
      customerName: order.enrollments?.user?.name || order.fullName,
      customerEmail: order.enrollments?.user?.email || order.email,
      courseTitle: order.enrollments?.courses?.title || 'N/A',
      amount: Number(order.enrollments?.courses?.price || 0),
      status: order.status,
      date: order.createdAt,
    }));

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const revenueByDay = await prisma.orders.findMany({
      where: { status: 'completed', createdAt: { gte: thirtyDaysAgo } },
      include: { enrollments: { include: { courses: { select: { price: true } } } } },
      orderBy: { createdAt: 'asc' }
    });
    type RevenueByDayOrder = (typeof revenueByDay)[number];
    const revenueChartData: { date: string; revenue: number }[] = [];
    const dayMap = new Map<string, number>();
    revenueByDay.forEach((order: RevenueByDayOrder) => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      const revenue = Number(order.enrollments?.courses?.price || 0);
      dayMap.set(dateKey, (dayMap.get(dateKey) || 0) + revenue);
    });

    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      revenueChartData.push({ date: dateKey, revenue: dayMap.get(dateKey) || 0 });
    }

    const usersByDay = await prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    type UserByDay = (typeof usersByDay)[number];
    const userGrowthData: { date: string; users: number }[] = [];
    const userDayMap = new Map<string, number>();
    usersByDay.forEach((user: UserByDay) => {
      if (!user.createdAt) return;
      const dateKey = user.createdAt.toISOString().split('T')[0];
      userDayMap.set(dateKey, (userDayMap.get(dateKey) || 0) + 1);
    });
    let cumulativeUsers = totalUsers - usersByDay.length;
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      cumulativeUsers += userDayMap.get(dateKey) || 0;
      userGrowthData.push({ date: dateKey, users: cumulativeUsers });
    }

    return NextResponse.json({
      success: true,
      stats: {
        users: { total: totalUsers, thisMonth: usersThisMonth, trend: parseFloat(userTrend.toString()) },
        courses: { total: totalCourses, thisMonth: coursesThisMonth, trend: parseFloat(courseTrend.toString()) },
        revenue: { total: totalRevenue, thisMonth: revenueThisMonth, trend: parseFloat(revenueTrend.toString()) },
        enrollments: { total: activeEnrollments, thisMonth: enrollmentsThisMonth, trend: parseFloat(enrollmentTrend.toString()) },
      },
      recentOrders: formattedRecentOrders,
      charts: { revenue: revenueChartData, userGrowth: userGrowthData },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard statistics.", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

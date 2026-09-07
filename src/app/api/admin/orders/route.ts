import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

/**
 * GET /api/admin/orders
 * List all orders with pagination and filters
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const skip = (page - 1) * perPage;

    // Build where clause
    interface WhereClause {
      status?: string;
      createdAt?: {
        gte: Date;
        lte: Date;
      };
    }
    const where: WhereClause = {};
    
    if (statusFilter) {
      where.status = statusFilter;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Fetch orders with related data
    const [orders, totalCount] = await Promise.all([
      prisma.orders.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          enrollments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatar: true,
                }
              },
              courses: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  thumbnail: true,
                  price: true,
                }
              }
            }
          }
        },
      }),
      prisma.orders.count({ where }),
    ]);

    // Format order data
    type OrderWithRelations = (typeof orders)[number];
    const formattedOrders = orders.map((order: OrderWithRelations) => ({
      id: order.id,
      orderId: `#ORD-${order.id.toString().padStart(6, '0')}`,
      fullName: order.fullName,
      phone: order.phone,
      email: order.email,
      customer: {
        id: order.enrollments?.user?.id,
        name: order.enrollments?.user?.name || order.fullName,
        email: order.enrollments?.user?.email || order.email,
        avatar: order.enrollments?.user?.avatar,
      },
      course: order.enrollments?.courses ? {
        id: order.enrollments.courses.id,
        title: order.enrollments.courses.title,
        slug: order.enrollments.courses.slug,
        thumbnail: order.enrollments.courses.thumbnail,
        price: order.enrollments.courses.price,
      } : null,
      amount: order.enrollments?.courses?.price || 0,
      paymentMethod: order.paymentMethod,
      transactionId: order.transactionId,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      }
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch orders.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

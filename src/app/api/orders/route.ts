import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { fullName, phone, email, courseId, paymentMethod, transactionId, userId } = body;
    
    if (!fullName || !phone || !email || !courseId || !paymentMethod || !transactionId) {
      return NextResponse.json({ 
        error: "All fields are required: fullName, phone, email, courseId, paymentMethod, transactionId" 
      }, { status: 400 });
    }

    // Validate that payment method is selected
    if (!paymentMethod || paymentMethod.trim() === "") {
      return NextResponse.json({ 
        error: "Payment method must be selected" 
      }, { status: 400 });
    }

    // Validate that transactionId is provided
    if (!transactionId || transactionId.trim() === "") {
      return NextResponse.json({ 
        error: "Transaction ID is required" 
      }, { status: 400 });
    }

    // Validate courseId format (basic check)
    if (!courseId || !/^[a-zA-Z0-9_-]+$/.test(courseId)) {
      return NextResponse.json({ 
        error: "Invalid course ID format" 
      }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Invalid email format" 
      }, { status: 400 });
    }

    // Get authenticated user if available
    const authUser = await getAuthUser();
    
    // If userId is provided in the request but no authenticated user, reject it
    if (userId && !authUser) {
      return NextResponse.json({ 
        error: "Unauthorized: Cannot set userId without authentication" 
      }, { status: 401 });
    }
    
    // If userId is provided in the request, verify it matches the authenticated user
    if (userId && authUser && userId !== authUser.id) {
      return NextResponse.json({ 
        error: "User ID mismatch" 
      }, { status: 403 });
    }

    // Create the order with status = pending
    const order = await prisma.order.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        courseId: courseId.trim(),
        paymentMethod: paymentMethod.trim(),
        transactionId: transactionId.trim(),
        status: "pending",
        userId: authUser ? authUser.id : null,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
      order
    }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create order. Please try again." 
    }, { status: 500 });
  }
}

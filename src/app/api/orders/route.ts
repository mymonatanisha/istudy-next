import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { fullName, phone, email, courseId, paymentMethod, transactionId, userId, password } = body;
    
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

    let userIdForOrder = authUser ? authUser.id : null;
    let userCreated = false;
    let token: string | undefined;

    // If user is not authenticated but provided password, create a new account
    if (!authUser && password) {
      // Validate password
      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }

      const trimmedEmail = email.trim().toLowerCase();

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: trimmedEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already registered. Please login instead." },
          { status: 409 }
        );
      }

      // Create new user
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: fullName.trim(),
          email: trimmedEmail,
          phone: phone.trim(),
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      userIdForOrder = newUser.id;
      userCreated = true;

      // Generate JWT token for auto-login
      const secret = process.env.JWT_SECRET;
      if (secret) {
        token = jwt.sign(
          { sub: newUser.id, email: newUser.email },
          secret,
          { expiresIn: "7d" }
        );
      } else {
        console.warn("JWT_SECRET not configured - user will not be auto-logged in");
      }
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
        userId: userIdForOrder,
      },
    });

    const response = NextResponse.json({ 
      success: true,
      message: userCreated ? "Account created and order placed successfully" : "Order placed successfully",
      orderId: order.id,
      order,
      userCreated
    }, { status: 201 });

    // Set JWT cookie if user was just created
    if (token) {
      const secure = process.env.NODE_ENV === "production";
      response.cookies.set("token", token, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create order. Please try again." 
    }, { status: 500 });
  }
}

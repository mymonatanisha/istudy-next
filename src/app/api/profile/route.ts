import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// GET - Fetch logged-in user's profile
export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        avatar: true,
        address: true,
        linkedIn: true,
        bio: true,
        occupation: true,
        headline: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update logged-in user's profile
export async function PUT(request: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate and sanitize input - only allow profile fields to be updated
    const allowedFields = [
      'name',
      'username',
      'phone',
      'avatar',
      'address',
      'linkedIn',
      'bio',
      'occupation',
      'headline',
    ];

    const updateData: Record<string, string | null> = {};
    for (const field of allowedFields) {
      if (field in body) {
        // Basic validation
        const value = body[field];
        if (value === null || value === undefined || value === '') {
          updateData[field] = null;
        } else if (typeof value === 'string') {
          updateData[field] = value.trim();
        } else {
          // Reject non-string values
          return NextResponse.json({ 
            error: `Invalid type for field '${field}'. Expected string or null.` 
          }, { status: 400 });
        }
      }
    }

    // Ensure at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Update the user - CRITICAL: Use auth.id from token, not from request body
    const updatedUser = await prisma.user.update({
      where: { id: auth.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        avatar: true,
        address: true,
        linkedIn: true,
        bio: true,
        occupation: true,
        headline: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: updatedUser 
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

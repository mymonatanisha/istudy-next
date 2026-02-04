import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { photo, fileName, fileType } = body;

    // Validate required fields
    if (!photo || !fileName || !fileType) {
      return NextResponse.json(
        { error: "Photo data is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed" },
        { status: 400 }
      );
    }

    // Validate base64 format
    if (!photo.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Invalid photo format" },
        { status: 400 }
      );
    }

    // Calculate approximate file size from base64 (base64 is ~33% larger than original)
    const base64Length = photo.split(",")[1]?.length || 0;
    const fileSizeInBytes = (base64Length * 3) / 4;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (fileSizeInBytes > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Update user's avatar field with the base64 image
    const updatedUser = await prisma.user.update({
      where: { id: auth.id },
      data: {
        avatar: photo,
      },
      select: {
        id: true,
        avatar: true,
      },
    });

    return NextResponse.json({
      message: "Profile photo uploaded successfully",
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

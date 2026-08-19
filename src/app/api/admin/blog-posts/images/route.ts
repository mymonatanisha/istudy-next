import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { getAdminUser } from "@/lib/admin-auth";
import { uploadBlogImage } from "@/lib/blog-image-storage";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DIMENSION = 8000;
const MIN_DIMENSION = 100;
const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp"]);

export async function POST(request: NextRequest) {
  try {
    const adminUser = await getAdminUser();
    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image must be greater than 0 bytes and 5 MB or smaller." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer, { failOn: "error" }).metadata();

    if (!metadata.format || !ALLOWED_FORMATS.has(metadata.format)) {
      return NextResponse.json(
        { success: false, error: "Only JPG, PNG, and WebP images are allowed." },
        { status: 400 }
      );
    }

    const width = metadata.width || 0;
    const height = metadata.height || 0;
    if (
      width < MIN_DIMENSION ||
      height < MIN_DIMENSION ||
      width > MAX_DIMENSION ||
      height > MAX_DIMENSION
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Image dimensions must be between ${MIN_DIMENSION}×${MIN_DIMENSION} and ${MAX_DIMENSION}×${MAX_DIMENSION} pixels.`,
        },
        { status: 400 }
      );
    }

    const result = await uploadBlogImage(
      new File([buffer], file.name, {
        type: file.type || `image/${metadata.format}`,
      })
    );

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      width,
      height,
      format: metadata.format,
    });
  } catch (error) {
    console.error("Blog image upload failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload image. Please verify the image and try again.",
      },
      { status: 500 }
    );
  }
}

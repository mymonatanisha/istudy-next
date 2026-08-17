import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;

  if (!session?.user || !["ADMIN", "admin"].includes(user?.role ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, and GIF images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
    }

    const extension = ALLOWED_TYPES.get(file.type)!;
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
    const filePath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({
      success: true,
      url: `/uploads/blog/${filename}`,
      filename,
    });
  } catch (error) {
    console.error("Blog image upload failed:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}

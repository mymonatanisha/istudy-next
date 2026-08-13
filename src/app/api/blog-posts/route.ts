import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const perPage = Number(searchParams.get("perPage") || "6");
    const skip = (page - 1) * perPage;

    const where = { status: "published" };
    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: perPage,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: { author: { select: { name: true } } },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching published blog posts:", error);
    return NextResponse.json({ success: true, posts: [], pagination: { page: 1, perPage: 6, total: 0, totalPages: 0 } });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const perPage = Math.min(12, Math.max(1, Number(searchParams.get("perPage") || "6")));
    const search = searchParams.get("q")?.trim() || "";
    const skip = (page - 1) * perPage;

    const where = {
      status: "published",
      // Rows with a NULL publishedAt are legacy/edge data — never surface them.
      publishedAt: { not: null },
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [posts, totalCount] = await Promise.all([
      prisma.blog_posts.findMany({
        where,
        skip,
        take: perPage,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        // Don't ship the full HTML content on list endpoints — only the detail
        // view needs it.
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          status: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
          user: { select: { name: true } },
        },
      }),
      prisma.blog_posts.count({ where }),
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
    return NextResponse.json(
      { success: false, posts: [], pagination: { page: 1, perPage: 6, total: 0, totalPages: 0 }, error: "Unable to load blog posts" },
      { status: 500 },
    );
  }
}

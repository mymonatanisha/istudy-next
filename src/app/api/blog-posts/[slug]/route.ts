import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeBlogContent } from "@/lib/blog-content";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, props: RouteProps) {
  try {
    const { slug } = await props.params;
    const post = await prisma.blog_posts.findFirst({
      where: { slug, status: "published" },
      include: { user: { select: { name: true } } },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        content: sanitizeBlogContent(post.content),
      },
    });
  } catch (error) {
    console.error("Error fetching published blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post." },
      { status: 500 }
    );
  }
}

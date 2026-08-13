import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const buildSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

async function getUniqueSlug(title: string, id: number, requestedSlug?: string) {
  const baseSlug = buildSlug(requestedSlug || title) || `blog-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing || existing.id === id) return slug;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, props: RouteProps) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const postId = Number(id);

    if (!Number.isInteger(postId)) {
      return NextResponse.json({ error: "Invalid blog post id." }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: RouteProps) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const postId = Number(id);
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const status = body.status === "published" ? "published" : "draft";

    if (!Number.isInteger(postId)) {
      return NextResponse.json({ error: "Invalid blog post id." }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ error: "Content is required." }, { status: 400 });
    }

    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        slug: await getUniqueSlug(title, postId, body.slug),
        excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : null,
        content,
        coverImage:
          typeof body.coverImage === "string" && body.coverImage.trim()
            ? body.coverImage.trim()
            : null,
        status,
        publishedAt:
          status === "published" ? existing.publishedAt || new Date() : null,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, props: RouteProps) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const postId = Number(id);

    if (!Number.isInteger(postId)) {
      return NextResponse.json({ error: "Invalid blog post id." }, { status: 400 });
    }

    await prisma.blogPost.delete({ where: { id: postId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}

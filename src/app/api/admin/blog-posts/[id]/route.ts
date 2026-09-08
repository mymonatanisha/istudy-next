import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { sanitizeBlogContent } from "@/lib/blog-content";
import {
  deleteBlogImage,
  extractBlogImagePublicIds,
} from "@/lib/blog-image-storage";

const MAX_TITLE_LENGTH = 200;
const MAX_EXCERPT_LENGTH = 500;
const MAX_CONTENT_LENGTH = 1_000_000;

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
    const existing = await prisma.blog_posts.findUnique({ where: { slug } });
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

    const post = await prisma.blog_posts.findUnique({
      where: { id: postId },
      include: { user: { select: { id: true, name: true, email: true } } },
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

    if (!Number.isInteger(postId)) {
      return NextResponse.json({ error: "Invalid blog post id." }, { status: 400 });
    }

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const rawContent = typeof body.content === "string" ? body.content.trim() : "";
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : null;
    const status = body.status === "published" ? "published" : "draft";

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (title.length > MAX_TITLE_LENGTH) {
      return NextResponse.json({ error: `Title must be ${MAX_TITLE_LENGTH} characters or fewer.` }, { status: 400 });
    }
    if (!rawContent) {
      return NextResponse.json({ error: "Content is required." }, { status: 400 });
    }
    if (rawContent.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "Content is too large." }, { status: 400 });
    }
    if (excerpt && excerpt.length > MAX_EXCERPT_LENGTH) {
      return NextResponse.json({ error: `Excerpt must be ${MAX_EXCERPT_LENGTH} characters or fewer.` }, { status: 400 });
    }

    const existing = await prisma.blog_posts.findUnique({ where: { id: postId } });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    const content = sanitizeBlogContent(rawContent);
    if (!content.trim()) {
      return NextResponse.json({ error: "Content does not contain any allowed HTML or text." }, { status: 400 });
    }

    const post = await prisma.blog_posts.update({
      where: { id: postId },
      data: {
        title,
        slug: await getUniqueSlug(title, postId, body.slug),
        excerpt,
        content,
        coverImage:
          typeof body.coverImage === "string" && body.coverImage.trim()
            ? body.coverImage.trim()
            : null,
        status,
        publishedAt:
          status === "published" ? existing.publishedAt || new Date() : null,
        updatedAt: new Date(),
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

    // Look up the post first so we can return 404 and clean up its images.
    const existing = await prisma.blog_posts.findUnique({
      where: { id: postId },
      select: { id: true, content: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    await prisma.blog_posts.delete({ where: { id: postId } });

    // Best-effort cleanup of Cloudinary images embedded in the post content.
    const publicIds = extractBlogImagePublicIds(existing.content);
    await Promise.all(publicIds.map((publicId) => deleteBlogImage(publicId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}

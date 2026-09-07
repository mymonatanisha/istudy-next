import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { sanitizeBlogContent } from "@/lib/blog-content";

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

async function getUniqueSlug(title: string, requestedSlug?: string) {
  const baseSlug = buildSlug(requestedSlug || title) || `blog-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.blog_posts.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function GET(request: NextRequest) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const perPage = Math.min(50, Math.max(1, Number(searchParams.get("perPage") || "10")));
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const skip = (page - 1) * perPage;

    const where = {
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(status ? { status } : {}),
    };

    const [posts, totalCount] = await Promise.all([
      prisma.blog_posts.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true } },
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
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
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

    const content = sanitizeBlogContent(rawContent);
    if (!content.trim()) {
      return NextResponse.json({ error: "Content does not contain any allowed HTML or text." }, { status: 400 });
    }

    const post = await prisma.blog_posts.create({
      data: {
        title,
        slug: await getUniqueSlug(title, body.slug),
        excerpt,
        content,
        coverImage:
          typeof body.coverImage === "string" && body.coverImage.trim()
            ? body.coverImage.trim()
            : null,
        status,
        publishedAt: status === "published" ? new Date() : null,
        authorId: adminUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}

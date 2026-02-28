import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin-auth";

const buildSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

async function getUniqueSlug(baseTitle: string) {
  const baseSlug = buildSlug(baseTitle) || `course-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

/**
 * GET /api/admin/courses
 * List all courses with pagination, search, and filters
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');
    const search = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || '';

    const skip = (page - 1) * perPage;

    // Build where clause
    interface WhereClause {
      OR?: Array<{ title?: { contains: string; mode: 'insensitive' }; instructorName?: { contains: string; mode: 'insensitive' } }>;
      status?: string;
    }
    const where: WhereClause = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { instructorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (statusFilter) {
      where.status = statusFilter;
    }

    const [courses, totalCount] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          },
          _count: {
            select: {
              enrollments: true,
            }
          }
        },
      }),
      prisma.course.count({ where }),
    ]);

    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        const enrollmentCount = course._count.enrollments;
        const courseRevenue = enrollmentCount * course.price;

        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          instructor: course.instructor?.name || course.instructorName,
          instructorAvatar: course.instructor?.avatar || course.instructorAvatar,
          instructorId: course.instructorId,
          price: course.price,
          oldPrice: course.oldPrice,
          students: enrollmentCount,
          revenue: courseRevenue,
          status: course.status,
          rating: course.rating,
          lessons: course.lessons,
          featured: course.featured,
          publishedAt: course.publishedAt,
          createdAt: course.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      courses: formattedCourses,
      pagination: {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      }
    });

  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch courses.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses
 * Basic course creation endpoint (authenticated users)
 */
export async function POST(request: NextRequest) {
  try {
    const adminUser = await getAdminUser();

    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const body = await request.json();

    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const courseDescription = typeof body.courseDescription === 'string' ? body.courseDescription.trim() : '';
    const shortDescription = typeof body.shortDescription === 'string' ? body.shortDescription.trim() : undefined;
    const requestedStatus = typeof body.status === 'string' ? body.status : 'draft';
    const status = requestedStatus === 'published' ? 'published' : 'draft';

    const rawPrice = Number(body.price);
    const rawOldPrice = body.oldPrice !== undefined && body.oldPrice !== null && body.oldPrice !== ''
      ? Number(body.oldPrice)
      : null;

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    if (!courseDescription) {
      return NextResponse.json({ error: 'Course description is required.' }, { status: 400 });
    }

    if (!Number.isFinite(rawPrice) || rawPrice < 0) {
      return NextResponse.json({ error: 'Price must be a valid non-negative number.' }, { status: 400 });
    }

    if (rawOldPrice !== null && (!Number.isFinite(rawOldPrice) || rawOldPrice < 0)) {
      return NextResponse.json({ error: 'Old price must be a valid non-negative number.' }, { status: 400 });
    }

    if (rawOldPrice !== null && rawPrice > rawOldPrice) {
      return NextResponse.json({ error: 'Sale/current price cannot be greater than regular price.' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: adminUser.id },
      select: { id: true, name: true, avatar: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'Authenticated user was not found.' }, { status: 404 });
    }

    const slug = await getUniqueSlug(title);

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        instructorName: dbUser.name,
        instructorAvatar: dbUser.avatar || undefined,
        instructorId: dbUser.id,
        courseDescription,
        shortDescription,
        price: rawPrice,
        oldPrice: rawOldPrice,
        status,
        publishedAt: status === 'published' ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, message: 'Course created successfully.', course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      {
        error: 'Failed to create course.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

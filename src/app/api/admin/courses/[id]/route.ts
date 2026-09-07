import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getAdminUser } from '@/lib/admin-auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/courses/:id
 * Basic course update endpoint
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    const adminUser = await getAdminUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const courseId = Number(id);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return NextResponse.json({ error: 'Invalid course id.' }, { status: 400 });
    }

    const existingCourse = await prisma.courses.findUnique({
      where: { id: courseId },
      select: { id: true, instructorId: true },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    // Ownership / authorization guard
    if (existingCourse.instructorId === null && !adminUser) {
      return NextResponse.json({ error: 'Forbidden: course ownership is not assigned.' }, { status: 403 });
    }

    if (!adminUser && existingCourse.instructorId !== authUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    const data: {
      title?: string;
      courseDescription?: string;
      shortDescription?: string | null;
      price?: number;
      oldPrice?: number | null;
      status?: string;
      publishedAt?: Date | null;
    } = {};

    if (typeof body.title === 'string') {
      const title = body.title.trim();
      if (!title) {
        return NextResponse.json({ error: 'Title cannot be empty.' }, { status: 400 });
      }
      data.title = title;
    }

    if (typeof body.courseDescription === 'string') {
      const desc = body.courseDescription.trim();
      if (!desc) {
        return NextResponse.json({ error: 'Course description cannot be empty.' }, { status: 400 });
      }
      data.courseDescription = desc;
    }

    if (body.shortDescription !== undefined) {
      if (body.shortDescription === null) {
        data.shortDescription = null;
      } else if (typeof body.shortDescription === 'string') {
        data.shortDescription = body.shortDescription.trim() || null;
      }
    }

    if (body.price !== undefined) {
      const parsedPrice = Number(body.price);
      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json({ error: 'Price must be a valid non-negative number.' }, { status: 400 });
      }
      data.price = parsedPrice;
    }

    if (body.oldPrice !== undefined) {
      if (body.oldPrice === null || body.oldPrice === '') {
        data.oldPrice = null;
      } else {
        const parsedOldPrice = Number(body.oldPrice);
        if (!Number.isFinite(parsedOldPrice) || parsedOldPrice < 0) {
          return NextResponse.json({ error: 'Old price must be a valid non-negative number.' }, { status: 400 });
        }
        data.oldPrice = parsedOldPrice;
      }
    }

    if (typeof body.status === 'string') {
      const validStatus = ['draft', 'published', 'archived'];
      if (!validStatus.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid course status.' }, { status: 400 });
      }

      data.status = body.status;
      if (body.status === 'published') {
        data.publishedAt = new Date();
      }

      if (body.status === 'draft') {
        data.publishedAt = null;
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided for update.' }, { status: 400 });
    }

    const updatedCourse = await prisma.courses.update({
      where: { id: courseId },
      data,
    });

    return NextResponse.json({ success: true, message: 'Course updated successfully.', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      {
        error: 'Failed to update course.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

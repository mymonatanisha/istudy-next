import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_INSTRUCTOR_NAME = 'Enamul Huq';

// Keep migration data dependency-free. The UI course files import .webp assets,
// which Node/ts-node cannot execute in a standalone database script.
// These are the database-relevant fields from the four public course definitions.
const coursesData = [
  {
    id: 36,
    title: 'Flutter App Development',
    courseTag: 'Free Course',
    badge: 'FREE',
    badgeClass: 'badge-primary',
    instructorName: 'Enamul Huq',
    instructorAvatar: '/assets/images/course/course-instructor-2.webp',
    lessons: 45,
    students: 0,
    rating: 5,
    price: 0,
    discount: 0,
    courseDescription: 'Learn Flutter and Dart step by step and build real-world mobile applications from the fundamentals to app deployment.',
    shortDescription: 'A practical Flutter learning roadmap covering Dart, Flutter fundamentals, UI, navigation, state management, APIs, databases, testing, real projects, and deployment.',
    thumbnail: '/assets/images/course/course-bg-2.webp',
    coverImage: null,
    status: 'published',
  },
  {
    id: 37,
    title: 'Android App Development with Java/XML',
    courseTag: 'Free Course',
    badge: 'FREE',
    badgeClass: 'badge-primary',
    instructorName: 'Enamul Huq',
    instructorAvatar: '/assets/images/course/course-instructor-2.webp',
    lessons: 32,
    students: 0,
    rating: 5,
    price: 0,
    discount: 0,
    courseDescription: 'Understand Android fundamentals from the ecosystem and SDK to Android Studio, Java/XML UI, core Android components, runtime, data transfer, database, and AndroidManifest.xml.',
    shortDescription: 'A focused foundation course for understanding Android development with Java and XML before moving into real-world project-based Android development.',
    thumbnail: '/assets/images/course/course-bg-3.webp',
    coverImage: null,
    status: 'published',
  },
  {
    id: 38,
    title: 'Git & GitHub for Developers',
    courseTag: 'Coming Soon',
    badge: 'COMING SOON',
    badgeClass: 'badge-warning',
    instructorName: 'Enamul Huq',
    instructorAvatar: '/assets/images/course/course-instructor-2.webp',
    lessons: 0,
    students: 0,
    rating: 0,
    price: 0,
    discount: 0,
    courseDescription: 'Learn Git and GitHub from the ground up and build a practical developer workflow for managing code, branches, collaboration, pull requests, and real-world projects.',
    shortDescription: 'A practical roadmap covering Git fundamentals, branching, collaboration, GitHub workflows, pull requests, conflict resolution, project management, and professional developer workflows. Video lessons and supporting resources will be added in future updates.',
    thumbnail: '/assets/images/course/course-bg-3.webp',
    coverImage: null,
    status: 'published',
  },
  {
    id: 39,
    title: 'Android App Development: Beginner to Advanced',
    courseTag: 'Free Course',
    badge: 'FREE',
    badgeClass: 'badge-success',
    instructorName: 'Enamul Huq',
    instructorAvatar: '/assets/images/course/course-instructor-6.webp',
    lessons: 0,
    students: 0,
    rating: 0,
    price: 0,
    discount: 0,
    courseDescription: 'Build real-world Android applications with Java and XML through project-based learning, with source code and practical resources added over time.',
    shortDescription: 'A project-focused Android learning track for students who already understand Android fundamentals and want to progress toward complete applications.',
    thumbnail: '/assets/images/course/course-bg-4.webp',
    coverImage: null,
    status: 'published',
  },
];

interface MigrationStats {
  total: number;
  created: number;
  updated: number;
  errors: number;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('Starting course migration for the four public courses...\n');
  console.log(`Found ${coursesData.length} course definitions\n`);

  const stats: MigrationStats = { total: coursesData.length, created: 0, updated: 0, errors: 0 };

  for (const course of coursesData) {
    try {
      const slugBase = generateSlug(course.title);

      const existingByLegacyId = await prisma.course.findFirst({
        where: { legacyId: course.id },
      });

      const existingBySlug = await prisma.course.findUnique({
        where: { slug: slugBase },
      });

      const existingCourse = existingByLegacyId ?? existingBySlug;
      const slug = existingCourse?.slug ?? slugBase;

      const data = {
        title: course.title,
        slug,
        courseTag: course.courseTag,
        badge: course.badge,
        badgeClass: course.badgeClass,
        instructorName: course.instructorName || DEFAULT_INSTRUCTOR_NAME,
        instructorAvatar: course.instructorAvatar,
        lessons: course.lessons,
        students: course.students,
        rating: course.rating,
        price: course.price,
        oldPrice: course.discount || null,
        courseDescription: course.courseDescription,
        shortDescription: course.shortDescription,
        thumbnail: course.thumbnail,
        coverImage: course.coverImage,
        status: course.status,
        featured: false,
        publishedAt: new Date(),
        legacyId: course.id,
        isLegacy: true,
      };

      if (existingCourse) {
        await prisma.course.update({ where: { id: existingCourse.id }, data });
        console.log(`Updated course ${course.id}: "${course.title}" (DB ID: ${existingCourse.id})`);
        stats.updated++;
      } else {
        const createdCourse = await prisma.course.create({ data });
        console.log(`Created course ${course.id}: "${course.title}" (DB ID: ${createdCourse.id})`);
        stats.created++;
      }
    } catch (error) {
      console.error(`Error migrating course ID ${course.id}: "${course.title}"`);
      console.error(error instanceof Error ? error.message : String(error));
      stats.errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Migration Summary');
  console.log('='.repeat(60));
  console.log(`Course definitions processed: ${stats.total}`);
  console.log(`Created: ${stats.created}`);
  console.log(`Updated: ${stats.updated}`);
  console.log(`Errors: ${stats.errors}`);

  const totalCourses = await prisma.course.count();
  const legacyCourses = await prisma.course.count({ where: { isLegacy: true } });
  const publishedCourses = await prisma.course.count({ where: { status: 'published' } });
  console.log(`Total courses in database: ${totalCourses}`);
  console.log(`Legacy courses: ${legacyCourses}`);
  console.log(`Published courses: ${publishedCourses}`);
  console.log('='.repeat(60));

  if (stats.errors > 0) {
    process.exit(1);
  }

  console.log('\nMigration completed successfully.');
}

main()
  .catch((error) => {
    console.error('Fatal error during migration:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

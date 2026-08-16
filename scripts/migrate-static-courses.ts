import { PrismaClient } from '@prisma/client';
import { flutterCourse } from '../src/data/courses/flutter-course-data';
import { androidFundamentalsCourse } from '../src/data/courses/android-fundamentals-course-data';
import { gitGithubCourse } from '../src/data/courses/git-github-course-data';
import { androidAdvancedCourse } from '../src/data/courses/android-advanced-course-data';

const prisma = new PrismaClient();

const DEFAULT_INSTRUCTOR_NAME = 'Unknown Instructor';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getImagePath(image: any): string | null {
  if (!image) return null;
  if (typeof image === 'object' && image.src) return image.src;
  if (typeof image === 'string') return image;
  return null;
}

const coursesData = [
  flutterCourse,
  androidFundamentalsCourse,
  gitGithubCourse,
  androidAdvancedCourse,
];

interface MigrationStats {
  total: number;
  created: number;
  updated: number;
  skipped: number;
  errors: number;
}

async function main() {
  console.log('🚀 Starting course migration for the four public courses...\n');
  console.log(`📚 Found ${coursesData.length} course definitions\n`);

  const stats: MigrationStats = {
    total: coursesData.length,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  for (const course of coursesData) {
    try {
      const slugBase = generateSlug(course.title);
      const existingByLegacyId = await prisma.course.findFirst({
        where: { legacyId: course.id },
      });

      // Also recognize a manually-created row with the same canonical slug.
      const existingBySlug = await prisma.course.findUnique({
        where: { slug: slugBase },
      });

      const existingCourse = existingByLegacyId ?? existingBySlug;

      const slug = existingCourse?.slug ?? slugBase;

      const data = {
        title: course.title,
        slug,
        courseTag: course.courseTag || null,
        badge: course.badge || null,
        badgeClass: course.badgeClass || null,
        instructorName: course.instructorName || DEFAULT_INSTRUCTOR_NAME,
        instructorAvatar: getImagePath(course.instructorImage),
        lessons: course.lessons || 0,
        students: course.students || 0,
        rating: course.rating || 0,
        price: course.price || 0,
        oldPrice: course.discount || null,
        courseDescription: course.courseDescription || '',
        shortDescription: course.details || null,
        thumbnail: getImagePath(course.image),
        coverImage: null,
        status: 'published',
        featured: false,
        publishedAt: new Date(),
        legacyId: course.id,
        isLegacy: true,
      };

      if (existingCourse) {
        // Only update rows belonging to these canonical course IDs/slugs.
        // Existing unrelated test/manual rows are left untouched.
        await prisma.course.update({
          where: { id: existingCourse.id },
          data,
        });
        console.log(`🔄 Updated course ${course.id}: "${course.title}" (DB ID: ${existingCourse.id})`);
        stats.updated++;
      } else {
        const createdCourse = await prisma.course.create({ data });
        console.log(`✅ Created course ${course.id}: "${course.title}" (DB ID: ${createdCourse.id})`);
        stats.created++;
      }
    } catch (error) {
      console.error(`❌ Error migrating course ID ${course.id}: "${course.title}"`);
      console.error('   Error:', error instanceof Error ? error.message : String(error));
      stats.errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`   Course definitions processed: ${stats.total}`);
  console.log(`   ✅ Created:                    ${stats.created}`);
  console.log(`   🔄 Updated:                    ${stats.updated}`);
  console.log(`   ⏭️  Skipped:                    ${stats.skipped}`);
  console.log(`   ❌ Errors:                     ${stats.errors}`);
  console.log('='.repeat(60));

  console.log('\n📈 Database Statistics:');
  const totalCourses = await prisma.course.count();
  const legacyCourses = await prisma.course.count({ where: { isLegacy: true } });
  const publishedCourses = await prisma.course.count({ where: { status: 'published' } });
  console.log(`   Total courses in database:     ${totalCourses}`);
  console.log(`   Legacy courses:                ${legacyCourses}`);
  console.log(`   Published courses:             ${publishedCourses}`);

  if (stats.errors > 0) {
    console.log('\n⚠️  Migration completed with errors. Please review the error messages above.');
    process.exit(1);
  }

  console.log('\n🎉 Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Fatal error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

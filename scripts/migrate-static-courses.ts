import { PrismaClient } from '@prisma/client';
import coursesData from '../src/data/courses/courses-data';

const prisma = new PrismaClient();

// Constants
const DEFAULT_INSTRUCTOR_NAME = 'Unknown Instructor';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to extract image path from StaticImageData
function getImagePath(image: any): string | null {
  if (!image) return null;
  // StaticImageData has a 'src' property
  if (typeof image === 'object' && image.src) {
    return image.src;
  }
  if (typeof image === 'string') {
    return image;
  }
  return null;
}

interface MigrationStats {
  total: number;
  created: number;
  skipped: number;
  errors: number;
}

async function main() {
  console.log('🚀 Starting course migration from static data...\n');
  console.log(`📚 Found ${coursesData.length} courses in static data\n`);

  const stats: MigrationStats = {
    total: coursesData.length,
    created: 0,
    skipped: 0,
    errors: 0,
  };

  for (const course of coursesData) {
    try {
      // Check if course already exists with this legacyId
      const existingCourse = await prisma.course.findFirst({
        where: { legacyId: course.id },
      });

      if (existingCourse) {
        console.log(`⏭️  Skipping course ID ${course.id}: "${course.title}" (already exists with legacyId)`);
        stats.skipped++;
        continue;
      }

      // Generate slug from title
      const slug = generateSlug(course.title);

      // Check if slug already exists
      const existingSlug = await prisma.course.findUnique({
        where: { slug },
      });

      if (existingSlug) {
        console.log(`⚠️  Warning: Slug "${slug}" already exists, appending legacyId`);
      }

      // Map the course data to database schema
      const courseData = {
        title: course.title,
        slug: existingSlug ? `${slug}-${course.id}` : slug,
        courseTag: course.courseTag || null,
        badge: course.badge || null,
        badgeClass: course.badgeClass || null,
        
        // Instructor info
        instructorName: course.instructorName || DEFAULT_INSTRUCTOR_NAME,
        instructorAvatar: getImagePath(course.instructorImage),
        
        // Stats
        lessons: course.lessons || 0,
        students: course.students || 0,
        rating: course.rating || 0,
        
        // Pricing
        price: course.price || 0,
        oldPrice: course.discount || null,
        
        // Content
        courseDescription: course.courseDescription || '',
        shortDescription: course.details || null,
        
        // Media
        thumbnail: getImagePath(course.image),
        
        // Publishing
        status: 'published',
        featured: false,
        publishedAt: new Date(),
        
        // Legacy support
        legacyId: course.id,
        isLegacy: true,
      };

      // Create the course
      const createdCourse = await prisma.course.create({
        data: courseData,
      });

      console.log(`✅ Created course ID ${course.id}: "${course.title}" (DB ID: ${createdCourse.id}, slug: ${createdCourse.slug})`);
      stats.created++;

    } catch (error) {
      console.error(`❌ Error migrating course ID ${course.id}: "${course.title}"`);
      console.error(`   Error:`, error instanceof Error ? error.message : String(error));
      stats.errors++;
    }
  }

  // Print summary statistics
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`   Total courses in static data: ${stats.total}`);
  console.log(`   ✅ Successfully created:      ${stats.created}`);
  console.log(`   ⏭️  Skipped (already exist):   ${stats.skipped}`);
  console.log(`   ❌ Errors:                    ${stats.errors}`);
  console.log('='.repeat(60));

  // Verify database state
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
  } else {
    console.log('\n🎉 Migration completed successfully!');
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

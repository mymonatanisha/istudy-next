import { PrismaClient } from '@prisma/client';
import coursesData from '../src/data/courses/courses-data';

const prisma = new PrismaClient();

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string, id: number): string {
  if (!title || title.trim() === '') {
    return `course-${id}`;
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Extract image URL from StaticImageData or return default
 */
function getImageUrl(imageData: any): string | null {
  if (!imageData) return null;
  
  // StaticImageData has a 'src' property
  if (typeof imageData === 'object' && 'src' in imageData) {
    return imageData.src;
  }
  
  // If it's already a string
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  return null;
}

async function main() {
  console.log('🚀 Starting course migration from static data to database...\n');

  let totalProcessed = 0;
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const course of coursesData) {
    totalProcessed++;
    
    try {
      // Check if course already exists by legacyId
      const existingCourse = await prisma.course.findFirst({
        where: { legacyId: course.id },
      });

      if (existingCourse) {
        console.log(`⏭️  Skipped: "${course.title}" (Legacy ID: ${course.id}) - Already imported`);
        skippedCount++;
        continue;
      }

      // Generate slug from title
      const slug = generateSlug(course.title, course.id);

      // Map static course data to database schema
      const courseData = {
        title: course.title,
        slug: slug,
        courseTag: course.courseTag || null,
        badge: course.badge || null,
        badgeClass: course.badgeClass || null,
        
        // Instructor info
        instructorName: course.instructorName || 'Unknown Instructor',
        instructorAvatar: getImageUrl(course.instructorImage),
        instructorId: null, // Can be linked later
        
        // Stats
        lessons: course.lessons || 0,
        students: 0, // Set to 0 initially as per requirements
        rating: course.rating || 0,
        
        // Pricing
        price: course.price || 0,
        oldPrice: course.discount || null,
        
        // Content
        courseDescription: course.courseDescription || 'No description available',
        shortDescription: course.details || null,
        
        // Media
        thumbnail: getImageUrl(course.image),
        coverImage: getImageUrl(course.image),
        
        // Publishing
        status: 'published',
        featured: false,
        publishedAt: new Date(),
        
        // Legacy support
        legacyId: course.id,
        isLegacy: true,
      };

      // Insert course into database
      const createdCourse = await prisma.course.create({
        data: courseData,
      });

      console.log(`✅ Success: "${createdCourse.title}" (ID: ${createdCourse.id}, Legacy ID: ${course.id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error: Failed to import course ID ${course.id} - "${course.title}"`);
      console.error(`   Error details: ${error instanceof Error ? error.message : String(error)}`);
      errorCount++;
    }
  }

  // Display summary statistics
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`Total courses processed: ${totalProcessed}`);
  console.log(`✅ Successfully imported: ${successCount}`);
  console.log(`⏭️  Skipped (already exist): ${skippedCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('='.repeat(60));
  
  if (errorCount > 0) {
    console.log('\n⚠️  Some courses failed to import. Please review the errors above.');
    process.exit(1);
  } else if (successCount > 0) {
    console.log('\n🎉 Migration completed successfully!');
  } else if (skippedCount === totalProcessed) {
    console.log('\n✨ All courses were already imported. Nothing to do!');
  }
}

main()
  .catch((e) => {
    console.error('\n💥 Fatal error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

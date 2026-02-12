import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DataIssue {
  courseId: number;
  issue: string;
}

async function main() {
  console.log('🔍 Verifying course import...\n');

  try {
    // Count total courses
    const totalCourses = await prisma.course.count();
    const legacyCourses = await prisma.course.count({ where: { isLegacy: true } });
    const publishedCourses = await prisma.course.count({ where: { status: 'published' } });
    const draftCourses = await prisma.course.count({ where: { status: 'draft' } });
    const featuredCourses = await prisma.course.count({ where: { featured: true } });

    // Print summary statistics
    console.log('📊 Course Import Statistics:');
    console.log('='.repeat(60));
    console.log(`   Total courses:           ${totalCourses}`);
    console.log(`   Legacy courses:          ${legacyCourses}`);
    console.log(`   Published courses:       ${publishedCourses}`);
    console.log(`   Draft courses:           ${draftCourses}`);
    console.log(`   Featured courses:        ${featuredCourses}`);
    console.log('='.repeat(60));

    // Get sample courses
    console.log('\n📚 Sample Courses (first 5):');
    console.log('-'.repeat(60));
    
    const sampleCourses = await prisma.course.findMany({
      take: 5,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        legacyId: true,
        instructorName: true,
        price: true,
        lessons: true,
        rating: true,
        status: true,
        isLegacy: true,
      },
    });

    sampleCourses.forEach((course, index) => {
      console.log(`\n${index + 1}. ${course.title}`);
      console.log(`   ID: ${course.id} | Legacy ID: ${course.legacyId || 'N/A'} | Slug: ${course.slug}`);
      console.log(`   Instructor: ${course.instructorName} | Price: $${course.price}`);
      console.log(`   Lessons: ${course.lessons} | Rating: ${course.rating} | Status: ${course.status}`);
      console.log(`   Is Legacy: ${course.isLegacy ? 'Yes' : 'No'}`);
    });

    // Check for data issues
    console.log('\n\n🔍 Checking for Data Issues:');
    console.log('-'.repeat(60));
    
    const issues: DataIssue[] = [];

    // Check for courses without titles
    const coursesWithoutTitles = await prisma.course.count({
      where: { title: '' },
    });
    if (coursesWithoutTitles > 0) {
      console.log(`⚠️  Found ${coursesWithoutTitles} course(s) without titles`);
      issues.push({ courseId: 0, issue: `${coursesWithoutTitles} courses without titles` });
    }

    // Check for courses without instructors
    const coursesWithoutInstructors = await prisma.course.count({
      where: { instructorName: '' },
    });
    if (coursesWithoutInstructors > 0) {
      console.log(`⚠️  Found ${coursesWithoutInstructors} course(s) without instructor names`);
      issues.push({ courseId: 0, issue: `${coursesWithoutInstructors} courses without instructors` });
    }

    // Check for courses with zero price
    const coursesWithZeroPrice = await prisma.course.count({
      where: { price: 0 },
    });
    if (coursesWithZeroPrice > 0) {
      console.log(`⚠️  Found ${coursesWithZeroPrice} course(s) with zero price`);
    }

    // Check for courses without thumbnails
    const coursesWithoutThumbnails = await prisma.course.count({
      where: { thumbnail: null },
    });
    if (coursesWithoutThumbnails > 0) {
      console.log(`⚠️  Found ${coursesWithoutThumbnails} course(s) without thumbnails`);
    }

    // Check for duplicate slugs
    const duplicateSlugs = await prisma.$queryRaw<{ slug: string; count: bigint }[]>`
      SELECT slug, COUNT(*) as count 
      FROM courses 
      GROUP BY slug 
      HAVING COUNT(*) > 1
    `;
    
    if (duplicateSlugs.length > 0) {
      console.log(`⚠️  Found ${duplicateSlugs.length} duplicate slug(s):`);
      duplicateSlugs.forEach(({ slug, count }) => {
        console.log(`   - "${slug}" appears ${count} times`);
        issues.push({ courseId: 0, issue: `Duplicate slug: ${slug}` });
      });
    }

    // Check for duplicate legacyIds
    const duplicateLegacyIds = await prisma.$queryRaw<{ legacyId: number; count: bigint }[]>`
      SELECT "legacyId", COUNT(*) as count 
      FROM courses 
      WHERE "legacyId" IS NOT NULL
      GROUP BY "legacyId" 
      HAVING COUNT(*) > 1
    `;
    
    if (duplicateLegacyIds.length > 0) {
      console.log(`⚠️  Found ${duplicateLegacyIds.length} duplicate legacyId(s):`);
      duplicateLegacyIds.forEach(({ legacyId, count }) => {
        console.log(`   - legacyId ${legacyId} appears ${count} times`);
        issues.push({ courseId: 0, issue: `Duplicate legacyId: ${legacyId}` });
      });
    }

    // Print verification result
    console.log('\n' + '='.repeat(60));
    if (issues.length === 0 && coursesWithZeroPrice === 0 && coursesWithoutThumbnails === 0) {
      console.log('✅ Verification passed! No critical data issues found.');
    } else {
      console.log(`⚠️  Verification completed with ${issues.length} critical issue(s).`);
      if (coursesWithZeroPrice > 0 || coursesWithoutThumbnails > 0) {
        console.log('ℹ️  Some warnings were found but they may not be critical.');
      }
    }
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error during verification:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

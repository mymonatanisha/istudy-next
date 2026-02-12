import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying course import...\n');
  console.log('='.repeat(60));

  // 1. Count total courses
  const totalCourses = await prisma.course.count();
  console.log(`📊 Total courses in database: ${totalCourses}`);

  // 2. Count legacy courses
  const legacyCourses = await prisma.course.count({
    where: { isLegacy: true },
  });
  console.log(`🏷️  Legacy courses: ${legacyCourses}`);

  // 3. Count published courses
  const publishedCourses = await prisma.course.count({
    where: { status: 'published' },
  });
  console.log(`📢 Published courses: ${publishedCourses}`);

  console.log('='.repeat(60));

  // 4. List first 5 imported courses
  console.log('\n📋 First 5 imported courses:');
  console.log('-'.repeat(60));
  
  const first5Courses = await prisma.course.findMany({
    take: 5,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      legacyId: true,
      isLegacy: true,
      status: true,
      instructorName: true,
      price: true,
    },
  });

  if (first5Courses.length === 0) {
    console.log('   No courses found in database.');
  } else {
    first5Courses.forEach((course, index) => {
      console.log(`\n${index + 1}. ${course.title}`);
      console.log(`   ID: ${course.id} | Slug: ${course.slug}`);
      console.log(`   Legacy ID: ${course.legacyId || 'N/A'} | Is Legacy: ${course.isLegacy}`);
      console.log(`   Status: ${course.status} | Instructor: ${course.instructorName}`);
      console.log(`   Price: $${course.price}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  // 5. Check for courses without slugs
  console.log('\n🔍 Checking for data quality issues...');
  console.log('-'.repeat(60));

  const coursesWithoutSlugs = await prisma.course.count({
    where: {
      OR: [
        { slug: null },
        { slug: '' },
      ],
    },
  });

  if (coursesWithoutSlugs > 0) {
    console.log(`⚠️  Found ${coursesWithoutSlugs} courses without slugs`);
    
    const problematicCourses = await prisma.course.findMany({
      where: {
        OR: [
          { slug: null },
          { slug: '' },
        ],
      },
      select: { id: true, title: true, slug: true },
    });
    
    problematicCourses.forEach(course => {
      console.log(`   - ID ${course.id}: "${course.title}" (slug: ${course.slug || 'NULL'})`);
    });
  } else {
    console.log('✅ All courses have valid slugs');
  }

  // 6. Check for duplicate slugs
  const duplicateSlugs = await prisma.$queryRaw<Array<{ slug: string; count: bigint }>>`
    SELECT slug, COUNT(*) as count
    FROM courses
    GROUP BY slug
    HAVING COUNT(*) > 1
  `;

  if (duplicateSlugs.length > 0) {
    console.log(`\n⚠️  Found ${duplicateSlugs.length} duplicate slugs:`);
    for (const dup of duplicateSlugs) {
      console.log(`   - Slug "${dup.slug}": ${dup.count} occurrences`);
      
      const coursesWithSlug = await prisma.course.findMany({
        where: { slug: dup.slug },
        select: { id: true, title: true, legacyId: true },
      });
      
      coursesWithSlug.forEach(course => {
        console.log(`     • ID ${course.id}: "${course.title}" (Legacy ID: ${course.legacyId})`);
      });
    }
  } else {
    console.log('✅ No duplicate slugs found');
  }

  // 7. Validate required fields
  console.log('\n🔍 Validating required fields...');
  
  const coursesWithMissingFields = await prisma.course.findMany({
    where: {
      OR: [
        { title: null },
        { title: '' },
        { courseDescription: null },
        { courseDescription: '' },
        { instructorName: null },
        { instructorName: '' },
      ],
    },
    select: { id: true, title: true, instructorName: true, courseDescription: true },
  });

  if (coursesWithMissingFields.length > 0) {
    console.log(`⚠️  Found ${coursesWithMissingFields.length} courses with missing required fields:`);
    coursesWithMissingFields.forEach(course => {
      const missing = [];
      if (!course.title) missing.push('title');
      if (!course.instructorName) missing.push('instructorName');
      if (!course.courseDescription) missing.push('courseDescription');
      console.log(`   - ID ${course.id}: Missing ${missing.join(', ')}`);
    });
  } else {
    console.log('✅ All courses have required fields');
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Verification completed!');
  console.log('='.repeat(60));
}

main()
  .catch((e) => {
    console.error('❌ Error during verification:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

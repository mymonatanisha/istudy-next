import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting sample course seeding...\n');

  // Sample courses data
  const sampleCourses = [
    {
      title: 'Master AI & Machine Learning from Scratch',
      slug: 'master-ai-machine-learning',
      courseTag: 'Beginner',
      badge: '20% Off',
      badgeClass: 'badge-warning',
      instructorName: 'Dr. Sarah Mitchell',
      instructorAvatar: '/assets/images/course/course-instructor-1.webp',
      lessons: 45,
      students: 520,
      rating: 4.8,
      price: 1999,
      oldPrice: 2499,
      courseDescription: 'Comprehensive course covering AI fundamentals, machine learning algorithms, neural networks, and real-world applications. Learn Python, TensorFlow, and build practical AI projects.',
      shortDescription: 'Master AI and ML with hands-on projects and expert guidance',
      thumbnail: '/assets/images/course/course-bg-1.webp',
      coverImage: '/assets/images/course/course-bg-1.webp',
      status: 'published',
      featured: true,
      publishedAt: new Date('2024-01-15'),
      isLegacy: false,
    },
    {
      title: 'Full Stack Web Development Bootcamp',
      slug: 'full-stack-web-development',
      courseTag: 'Intermediate',
      badge: 'Popular',
      badgeClass: 'badge-success',
      instructorName: 'Michael Chen',
      instructorAvatar: '/assets/images/course/course-instructor-2.webp',
      lessons: 60,
      students: 850,
      rating: 4.9,
      price: 2499,
      oldPrice: 2999,
      courseDescription: 'Complete web development course covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and deployment. Build real-world applications from scratch.',
      shortDescription: 'Become a full-stack developer with modern technologies',
      thumbnail: '/assets/images/course/course-bg-2.webp',
      coverImage: '/assets/images/course/course-bg-2.webp',
      status: 'published',
      featured: true,
      publishedAt: new Date('2024-02-01'),
      isLegacy: false,
    },
    {
      title: 'Data Science & Analytics Professional',
      slug: 'data-science-analytics',
      courseTag: 'Advanced',
      badge: 'New',
      badgeClass: 'badge-info',
      instructorName: 'Dr. Emily Rodriguez',
      instructorAvatar: '/assets/images/course/course-instructor-5.webp',
      lessons: 50,
      students: 420,
      rating: 4.7,
      price: 2199,
      oldPrice: 2699,
      courseDescription: 'Advanced data science course covering statistical analysis, data visualization, predictive modeling, big data tools, and business intelligence. Master Python, R, SQL, and Tableau.',
      shortDescription: 'Transform data into actionable insights with advanced analytics',
      thumbnail: '/assets/images/course/course-bg-3.webp',
      coverImage: '/assets/images/course/course-bg-3.webp',
      status: 'published',
      featured: false,
      publishedAt: new Date('2024-03-10'),
      isLegacy: false,
    },
  ];

  // Create courses
  for (const courseData of sampleCourses) {
    try {
      const course = await prisma.course.create({
        data: courseData,
      });
      console.log(`✅ Created course: ${course.title} (ID: ${course.id})`);
    } catch (error) {
      console.error(`❌ Error creating course "${courseData.title}":`, error);
    }
  }

  console.log('\n🎉 Sample course seeding completed!');
  console.log('📊 Summary:');
  
  const totalCourses = await prisma.course.count();
  const publishedCourses = await prisma.course.count({ where: { status: 'published' } });
  const featuredCourses = await prisma.course.count({ where: { featured: true } });
  
  console.log(`   Total courses: ${totalCourses}`);
  console.log(`   Published courses: ${publishedCourses}`);
  console.log(`   Featured courses: ${featuredCourses}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

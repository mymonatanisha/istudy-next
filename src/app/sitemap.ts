import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const SITE_URL = 'https://enamnotes.com';

/**
 * Curated public pages. Deliberately NOT every route in the app:
 * template demo routes (/blog-list, /blog-grid, /element-*, /style-guide),
 * auth pages and dashboards must stay out of the index.
 *
 * To add a page, append it here — everything else is generated.
 */
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
  { url: `${SITE_URL}/courses`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/about-online-course`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/contact-us`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${SITE_URL}/terms-conditions`, changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * Course pages that exist in src/data/courses and render real content.
 * (Course data is static, not read from the database — so this list is
 * maintained by hand.)
 */
const COURSE_IDS = [35, 36, 37, 38, 39];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coursePages: MetadataRoute.Sitemap = COURSE_IDS.map((id) => ({
    url: `${SITE_URL}/courses/course-details/${id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  let postPages: MetadataRoute.Sitemap = [];

  try {
    const posts = await prisma.blog_posts.findMany({
      // same gate the public pages use: both fields must be set
      where: { status: 'published', publishedAt: { not: null } },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    postPages = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // A sitemap is crawled by bots; a database blip must not turn it into a 500.
    // Fall back to the static entries so the file is always well-formed.
  }

  return [...STATIC_PAGES, ...coursePages, ...postPages];
}

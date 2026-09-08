import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import DatabaseBlogSidebar from '@/components/common/blog/DatabaseBlogSidebar';
import Wrapper from '@/layout/DefaultWrapper';
import { prisma } from '@/lib/prisma';
import { sanitizeBlogContent } from '@/lib/blog-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_NAME = 'Enam Notes';
const SITE_URL = 'https://enamnotes.com';

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { slug } = await props.params;
  const post = await prisma.blog_posts.findFirst({
    where: { slug, status: 'published', publishedAt: { not: null } },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  });

  if (!post) return { title: `Blog Post Not Found | ${SITE_NAME}` };

  const title = `${post.title} | ${SITE_NAME}`;
  const description = post.excerpt?.trim() || post.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
};

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const DatabaseBlogDetailsPage = async (props: PageProps) => {
  const { slug } = await props.params;

  const post = await prisma.blog_posts.findFirst({
    where: { slug, status: 'published', publishedAt: { not: null } },
    include: { user: { select: { name: true } } },
  });

  if (!post) notFound();

  const sanitizedContent = sanitizeBlogContent(post.content);

  return (
    <Wrapper>
      <main>
        <Breadcrumbs breadcrumbTitle={post.title} />
        <section className="bd-postbox-area section-space">
          <div className="container">
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <article className="bd-postbox-wrapper">
                  {post.coverImage && (
                    <div className="bd-blog-feature-thumb mb-30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 'auto' }} />
                    </div>
                  )}
                  <div className="bd-blog-meta-list mb-20">
                    <div className="bd-blog-meta-item has-separator">
                      <span className="meta-icon"><i className="fa-solid fa-user"></i></span>
                      <span className="meta-text">{post.user?.name || 'Admin'}</span>
                    </div>
                    <div className="bd-blog-meta-item">
                      <span className="meta-icon"><i className="fa-sharp fa-light fa-calendar-days"></i></span>
                      <span className="meta-text">
                        {formatDate(post.publishedAt || post.createdAt || new Date())}
                      </span>
                    </div>
                  </div>
                  <h1 className="bd-postbox-title mb-20">{post.title}</h1>
                  {post.excerpt && <p className="bd-postbox-desc"><strong>{post.excerpt}</strong></p>}
                  <div
                    className="bd-postbox-desc blog-rich-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />
                </article>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4">
                <DatabaseBlogSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default DatabaseBlogDetailsPage;

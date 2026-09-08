import Link from "next/link";
import { prisma } from "@/lib/prisma";

const formatDate = (date: Date | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

/**
 * DB-backed blog sidebar: shows the latest published posts so the sidebar
 * stays relevant to real content (unlike the static demo BlogSidebar).
 */
const DatabaseBlogSidebar = async () => {
  const latestPosts = await prisma.blog_posts.findMany({
    where: { status: "published", publishedAt: { not: null } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
    select: {
      slug: true,
      title: true,
      coverImage: true,
      publishedAt: true,
    },
  });

  return (
    <aside className="bd-blog-sidebar sidebar-right sidebar-sticky">
      <div className="bd-blog-widget widget-latest-posts">
        <h5 className="bd-widget-title mb-20">Latest Post</h5>
        <div className="bd-widget-posts">
          {latestPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            latestPosts.map((post) => (
              <div className="bd-recent-post-item" key={post.slug}>
                {post.coverImage && (
                  <div className="bd-recent-post-thumb">
                    <Link href={`/blog/${post.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt={post.title} />
                    </Link>
                  </div>
                )}
                <div className="bd-recent-post-content">
                  <div className="bd-recent-post-meta">
                    <span className="icon"><i className="fa-light fa-calendar-days"></i></span>
                    <span className="date">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h6 className="bd-recent-post-title underline">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h6>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bd-sidebar-promotion">
        <Link href="/sign-up" className="thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/blog/sidebar-banner.webp" alt="Enroll now" />
        </Link>
      </div>
    </aside>
  );
};

export default DatabaseBlogSidebar;

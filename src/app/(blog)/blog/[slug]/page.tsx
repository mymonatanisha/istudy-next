'use client';

import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import BlogSidebar from '@/components/common/blog/BlogSidebar';
import Wrapper from '@/layout/DefaultWrapper';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BlogPost {
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  author?: { name: string } | null;
}

const DatabaseBlogDetailsPage = () => {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/blog-posts/${params.slug}`, { cache: 'no-store' });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Blog post not found');
        setLoading(false);
        return;
      }

      setPost(result.post);
      setLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  return (
    <Wrapper>
      <main>
        <Breadcrumbs breadcrumbTitle={post?.title || 'Blog Details'} />
        <section className="bd-postbox-area section-space">
          <div className="container">
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error || !post ? (
                  <div className="alert alert-warning">
                    {error || 'Blog post not found'} <Link href="/blog">Back to blog</Link>
                  </div>
                ) : (
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
                        <span className="meta-text">{post.author?.name || 'Admin'}</span>
                      </div>
                      <div className="bd-blog-meta-item">
                        <span className="meta-icon"><i className="fa-sharp fa-light fa-calendar-days"></i></span>
                        <span className="meta-text">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h1 className="bd-postbox-title mb-20">{post.title}</h1>
                    {post.excerpt && <p className="bd-postbox-desc"><strong>{post.excerpt}</strong></p>}
                    <div
                      className="bd-postbox-desc blog-rich-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </article>
                )}
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default DatabaseBlogDetailsPage;

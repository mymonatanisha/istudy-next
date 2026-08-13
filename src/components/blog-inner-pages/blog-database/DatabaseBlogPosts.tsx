'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface DatabaseBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  author?: { name: string } | null;
}

const DatabaseBlogPosts = () => {
  const [posts, setPosts] = useState<DatabaseBlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/blog-posts', { cache: 'no-store' });
      if (!response.ok) return;
      const result = await response.json();
      setPosts(result.posts || []);
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bd-blog-area section-space-bottom">
      <div className="container">
        <div className="row justify-content-center section-title-space">
          <div className="col-xl-7 col-lg-8">
            <div className="bd-section-title-wrapper text-center">
              <span className="bd-section-subtitle">Latest Posts</span>
              <h2 className="bd-section-title">From Our Blog</h2>
            </div>
          </div>
        </div>
        <div className="row gy-30">
          {posts.map((post) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={post.id}>
              <article className="bd-blog-wrapper style-four">
                {post.coverImage && (
                  <div className="bd-blog-thumb">
                    <Link href={`/blog/${post.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt={post.title} />
                    </Link>
                  </div>
                )}
                <div className="bd-blog-content">
                  <div className="bd-blog-meta-list">
                    <div className="bd-blog-meta-item has-separator-black">
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
                  <h5 className="bd-blog-title underline">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h5>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <div className="bd-blog-btn">
                    <Link href={`/blog/${post.slug}`} className="bd-text-btn">
                      Read More <span className="box-icon"><i className="fa-regular fa-arrow-right-long first-icon"></i><i className="fa-regular fa-arrow-right-long second-icon"></i></span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatabaseBlogPosts;

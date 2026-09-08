'use client';

import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import Link from 'next/link';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';

interface DatabaseBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  user?: { name: string } | null;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const DatabaseBlogPosts = () => {
  const [posts, setPosts] = useState<DatabaseBlogPost[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 6, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (page: number, query: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '6' });
      if (query) params.set('q', query);
      const response = await fetch(`/api/blog-posts?${params.toString()}`, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to load blog posts');
      setPosts(result.posts || []);
      setPagination(result.pagination || { page, perPage: 6, total: 0, totalPages: 0 });
    } catch (err) {
      setPosts([]);
      setError(err instanceof Error ? err.message : 'Unable to load blog posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1, '');
  }, [fetchPosts]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    setActiveSearch(query);
    fetchPosts(1, query);
  };

  return (
    <>
      <Breadcrumbs breadcrumbTitle="Blog" />
      <section className="bd-blog-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="mb-35">
                <span className="bd-section-subtitle">Enam Notes Blog</span>
                <h1 className="bd-section-title mb-10">Latest articles & practical guides</h1>
                <p className="mb-0">Practical tutorials, app development notes, technology insights, and learning resources from Enam Notes.</p>
              </div>

              {activeSearch && (
                <div className="alert alert-info d-flex justify-content-between align-items-center mb-30">
                  <span>Search results for <strong>{activeSearch}</strong> ({pagination.total})</span>
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setSearch(''); setActiveSearch(''); fetchPosts(1, ''); }}>
                    Clear
                  </button>
                </div>
              )}

              {loading ? (
                <div className="text-center py-5" aria-live="polite">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading blog posts...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-warning">{error}</div>
              ) : posts.length === 0 ? (
                <div className="bd-blog-wrapper p-4 text-center">
                  <h4>No published posts yet</h4>
                  <p className="mb-0">New articles will appear here once they are published from the admin dashboard.</p>
                </div>
              ) : (
                <>
                  <div className="row gy-30">
                    {posts.map((post) => (
                      <div className="col-xl-6 col-lg-6 col-md-6" key={post.id}>
                        <article className="bd-blog-wrapper style-four h-100">
                          {post.coverImage ? (
                            <div className="bd-blog-thumb">
                              <Link href={`/blog/${post.slug}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={post.coverImage} alt={post.title} loading="lazy" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                              </Link>
                            </div>
                          ) : (
                            <div className="bd-blog-thumb d-flex align-items-center justify-content-center" style={{ minHeight: '240px' }}>
                              <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                                <span className="bd-section-title">Enam Notes</span>
                              </Link>
                            </div>
                          )}
                          <div className="bd-blog-content">
                            <div className="bd-blog-meta-list">
                              <div className="bd-blog-meta-item has-separator-black">
                                <span className="meta-icon"><i className="fa-solid fa-user"></i></span>
                                <span className="meta-text">{post.user?.name || 'Enam Notes'}</span>
                              </div>
                              <div className="bd-blog-meta-item">
                                <span className="meta-icon"><i className="fa-sharp fa-light fa-calendar-days"></i></span>
                                <span className="meta-text">{formatDate(post.publishedAt || post.createdAt)}</span>
                              </div>
                            </div>
                            <h3 className="bd-blog-title mb-15 underline">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            {post.excerpt && <p>{post.excerpt}</p>}
                            <div className="bd-blog-btn mt-15">
                              <Link href={`/blog/${post.slug}`} className="bd-text-btn">
                                Read Article <span className="box-icon"><i className="fa-regular fa-arrow-right-long first-icon"></i><i className="fa-regular fa-arrow-right-long second-icon"></i></span>
                              </Link>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <nav className="mt-50" aria-label="Blog pagination">
                      <ul className="pagination justify-content-center gap-2">
                        <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" disabled={pagination.page === 1} onClick={() => fetchPosts(pagination.page - 1, activeSearch)} aria-label="Previous page">
                            <i className="fa-regular fa-angle-left"></i>
                          </button>
                        </li>
                        {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
                          <li className={`page-item ${page === pagination.page ? 'active' : ''}`} key={page}>
                            <button className="page-link" onClick={() => fetchPosts(page, activeSearch)} aria-current={page === pagination.page ? 'page' : undefined}>
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" disabled={pagination.page === pagination.totalPages} onClick={() => fetchPosts(pagination.page + 1, activeSearch)} aria-label="Next page">
                            <i className="fa-regular fa-angle-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <aside className="bd-blog-sidebar sidebar-right sidebar-sticky">
                <div className="bd-blog-widget widget-search">
                  <h5 className="bd-widget-title mb-20">Search Articles</h5>
                  <form className="bd-sidebar-search-form" onSubmit={handleSearch}>
                    <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search the blog..." aria-label="Search blog" />
                    <button type="submit" aria-label="Search"><i className="far fa-search"></i></button>
                  </form>
                </div>

                <div className="bd-blog-widget">
                  <h5 className="bd-widget-title mb-20">About Enam Notes</h5>
                  <p className="mb-0">Useful, practical content for developers, learners, and anyone building with modern technology.</p>
                </div>

                <div className="bd-blog-widget">
                  <h5 className="bd-widget-title mb-20">Publishing from Database</h5>
                  <p className="mb-0">Only published articles from the BlogPost database are shown here. Drafts stay private until they are published.</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DatabaseBlogPosts;

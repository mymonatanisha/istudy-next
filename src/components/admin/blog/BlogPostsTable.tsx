'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/admin/common/Pagination';
import SearchBar from '@/components/admin/common/SearchBar';
import StatusBadge from '@/components/admin/common/StatusBadge';
import BlogPostForm from './BlogPostForm';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author?: { name: string; email: string } | null;
}

const BlogPostsTable = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: '10',
      });

      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/blog-posts?${params}`, {
        cache: 'no-store',
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch blog posts');
      }

      setPosts(result.posts);
      setTotalPages(result.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return;

    const response = await fetch(`/api/admin/blog-posts/${post.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchPosts();
      return;
    }

    const result = await response.json();
    setError(result.error || 'Failed to delete blog post');
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  return (
    <div className="bd-dashboard-blog-table">
      {showForm ? (
        <BlogPostForm
          post={editingPost}
          onSaved={handleSaved}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      ) : (
        <>
          <div className="bd-dashboard-section-header mb-20 d-flex justify-content-between align-items-center">
            <h5 className="bd-dashboard-section-title">Blog Management</h5>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setEditingPost(null);
                setShowForm(true);
              }}
            >
              <i className="fa-light fa-plus"></i> New Post
            </button>
          </div>

          <div className="row g-3 mb-20">
            <div className="col-md-6">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Search blog posts..."
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <>
              <div className="bd-dashboard-table-wrapper">
                <table className="table bd-dashboard-table">
                  <thead>
                    <tr>
                      <th>Post</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No blog posts found
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <strong>{post.title}</strong>
                            <br />
                            <small className="text-muted">/{post.slug}</small>
                          </td>
                          <td>{post.author?.name || 'Admin'}</td>
                          <td><StatusBadge status={post.status} /></td>
                          <td>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : '—'}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {post.status === 'published' && (
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="btn btn-sm btn-outline-primary"
                                  target="_blank"
                                >
                                  <i className="fa-light fa-eye"></i>
                                </Link>
                              )}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
                                  setEditingPost(post);
                                  setShowForm(true);
                                }}
                              >
                                <i className="fa-light fa-pen"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(post)}
                              >
                                <i className="fa-light fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPostsTable;

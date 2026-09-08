'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import BlogImageInsert from './BlogImageInsert';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
}

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSaved: () => void;
  onCancel: () => void;
}

const buildSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const BlogPostForm = ({ post, onSaved, onCancel }: BlogPostFormProps) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState('draft');
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(post?.title || '');
    setSlug(post?.slug || '');
    setExcerpt(post?.excerpt || '');
    setContent(post?.content || '');
    setCoverImage(post?.coverImage || '');
    setStatus(post?.status || 'draft');
    setError(null);
  }, [post]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!post) setSlug(buildSlug(value));
  };

  const uploadCoverImage = async (file: File) => {
    setCoverUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/admin/blog-posts/images', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to upload cover image');
      setCoverImage(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload cover image');
    } finally {
      setCoverUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  const insertImageAtCursor = (imageHtml: string) => {
    const textarea = contentRef.current;
    if (!textarea) {
      setContent((current) => (current ? `${current}\n\n${imageHtml}` : imageHtml));
      return;
    }

    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? start;
    const before = content.slice(0, start);
    const after = content.slice(end);
    const separatorBefore = before && !before.endsWith('\n') ? '\n\n' : '';
    const separatorAfter = after && !after.startsWith('\n') ? '\n\n' : '';
    const nextContent = `${before}${separatorBefore}${imageHtml}${separatorAfter}${after}`;
    const cursorPosition = (before + separatorBefore + imageHtml).length;

    setContent(nextContent);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        post ? `/api/admin/blog-posts/${post.id}` : '/api/admin/blog-posts',
        {
          method: post ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, slug, excerpt, content, coverImage, status }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to save blog post');
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-30">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">{post ? 'Edit Blog Post' : 'Create Blog Post'}</h5>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label" htmlFor="blog-title">Title</label>
          <input id="blog-title" className="form-control" value={title} onChange={(event) => handleTitleChange(event.target.value)} required />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="blog-status">Status</label>
          <select id="blog-status" className="form-select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="blog-slug">Slug</label>
          <input id="blog-slug" className="form-control" value={slug} onChange={(event) => setSlug(buildSlug(event.target.value))} placeholder="auto-generated-from-title" />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="blog-cover">Cover Image</label>
          <div className="d-flex gap-2">
            <input id="blog-cover" className="form-control" value={coverImage} onChange={(event) => setCoverImage(event.target.value)} placeholder="https://..." />
            <button type="button" className="btn btn-outline-primary text-nowrap" disabled={coverUploading} onClick={() => coverInputRef.current?.click()}>
              {coverUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="d-none"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadCoverImage(file);
            }}
          />
          {coverImage && <img src={coverImage} alt="Cover preview" className="mt-2 rounded" style={{ maxWidth: '260px', maxHeight: '140px', objectFit: 'cover' }} />}
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="blog-excerpt">Excerpt</label>
          <textarea id="blog-excerpt" className="form-control" rows={3} value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="Short summary shown on blog cards" />
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <label className="form-label mb-0" htmlFor="blog-content">Content</label>
            <div className="d-flex align-items-center gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setShowPreview((value) => !value)}>
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <BlogImageInsert onInsert={insertImageAtCursor} />
            </div>
          </div>
          <textarea
            ref={contentRef}
            id="blog-content"
            className="form-control"
            rows={20}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write HTML content here. Use Insert Image to upload an image into the article."
            required
          />
          {showPreview && (
            <div className="mt-3 border rounded p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small">Live preview</span>
                {title && <h1 className="h4 mb-0">{title}</h1>}
              </div>
              {excerpt && <p className="fst-italic mb-2">{excerpt}</p>}
              <div className="blog-rich-content" dangerouslySetInnerHTML={{ __html: content || '<p>Nothing to preview yet.</p>' }} />
            </div>
          )}
          <div className="form-text">Images are uploaded to persistent Cloudinary storage and inserted at the current cursor position. Content is sanitized on save.</div>
        </div>
      </div>

      <div className="d-flex gap-2 mt-20">
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default BlogPostForm;

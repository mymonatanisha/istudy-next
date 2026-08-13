# Blog content upload guide

The blog now supports database-backed posts from the admin dashboard.

## Recommended upload process

1. Open `/admin/blog`.
2. Click **New Post**.
3. Add the title, excerpt, content, and status.
4. Add a cover image URL.
   - Lightweight option: upload an optimized `.webp` image to your hosting/storage provider and paste the URL.
   - Current local option: add the file to `public/assets/images/blog/` and use a path like `/assets/images/blog/my-post.webp`.
5. Save as **Draft** while editing.
6. Change status to **Published** when ready.
7. Published database posts appear on `/blog` and open at `/blog/[slug]`.

## Performance notes

- Prefer `.webp` images.
- Keep cover images around 800-1200px wide.
- Keep each cover image under roughly 200-400KB when possible.
- Store only the image URL in the database. Do not store large blog images as base64 in the database.

## Legacy static posts

The older static posts still live in `src/data/blog-data.ts`. They remain as fallback/sample content while database posts are added through `/admin/blog`.

*** Begin Patch
*** Add File: src/lib/blog.ts
+import blogData from '@/data/blog-data';
+import { IBlog } from '@/interFace/interFace';
+
+export function getVisibleBlogs(): IBlog[] {
+  return blogData.filter((b) => b.isPublished !== false);
+}
+
+export function getLatest(n = 6): IBlog[] {
+  return getVisibleBlogs().slice(0, n);
+}
+
+export function getPage(page = 1, perPage = 6): { posts: IBlog[]; total: number } {
+  const visible = getVisibleBlogs();
+  const start = (page - 1) * perPage;
+  return { posts: visible.slice(start, start + perPage), total: visible.length };
+}
+
+export default { getVisibleBlogs, getLatest, getPage };
+
*** End Patch
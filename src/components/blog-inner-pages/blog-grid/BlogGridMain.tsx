*** Begin Patch
*** Update File: src/components/blog-inner-pages/blog-grid/BlogGridMain.tsx
@@
-import BlogSidebar from '@/components/common/blog/BlogSidebar';
-import BlogSingleCard from '@/components/common/blog/BlogSingleCard';
-import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
-import BasicPagination from '@/components/elements/pagination/BasicPagination';
-import blogData from '@/data/blog-data';
-import React from 'react';
+import BlogSidebar from '@/components/common/blog/BlogSidebar';
+import BlogSingleCard from '@/components/common/blog/BlogSingleCard';
+import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
+import BasicPagination from '@/components/elements/pagination/BasicPagination';
+import { getPage } from '@/lib/blog';
+import React from 'react';
@@
-    return (
+    const page = 1;
+    const perPage = 8; // replace previous slice(22,30)
+    const { posts } = getPage(page, perPage);
+
+    return (
@@
-                                    blogData.slice(22, 30).map((item) => (
-                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6" key={item.id}>
-                                            <BlogSingleCard item={item} />
-                                        </div>
-                                    ))
+                                    posts.map((item) => (
+                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6" key={item.id}>
+                                            <BlogSingleCard item={item} />
+                                        </div>
+                                    ))
                                 }
*** End Patch
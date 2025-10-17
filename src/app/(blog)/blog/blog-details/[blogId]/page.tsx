import BlogDetailsMain from '@/components/blog-inner-pages/blog/blog-details/BlogDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';
import blogData from '@/data/blog-data';         // <-- import data
import { notFound } from 'next/navigation';     // <-- import notFound

export const metadata: Metadata = {
  title: "Blog Details - Education & Online Courses React NextJs Template",
};

interface PageProps {
  params: Promise<{ blogId: string }>;
}

const Blog = async (props: PageProps) => {
  const resolvedParams = await props.params;
  const blogIdNum = Number(resolvedParams.blogId);

  // server-side guard: find the blog and return 404 if not found or explicitly unpublished
  const blog = blogData.find(b => b.id === blogIdNum);
  if (!blog || blog.isPublished === false) {
    notFound(); // stops rendering and returns Next's 404
  }

  return (
    <Wrapper>
      <main>
        <BlogDetailsMain blogId={blogIdNum} />
      </main>
    </Wrapper>
  );
};

export default Blog;
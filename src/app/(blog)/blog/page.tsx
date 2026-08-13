import BlogMain from '@/components/blog-inner-pages/blog/BlogMain';
import DatabaseBlogPosts from '@/components/blog-inner-pages/blog-database/DatabaseBlogPosts';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Blog Standard - Enam Notes Online Courses",
};

const Blog = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <DatabaseBlogPosts />
                    <BlogMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Blog;
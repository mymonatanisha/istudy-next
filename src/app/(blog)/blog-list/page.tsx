import BlogListMain from '@/components/blog-inner-pages/blog-list/BlogListMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Blog List - Enam Notes Online Courses",
};

const BlogList = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BlogListMain />
                </main>
            </Wrapper>
        </>
    );
};

export default BlogList;
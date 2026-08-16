import BlogDetailsMain from '@/components/blog-inner-pages/blog/blog-details/BlogDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Blog Details - Enam Notes Online Courses",
};

const Blog = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BlogDetailsMain blogId={1} />
                </main>
            </Wrapper>
        </>
    );
};

export default Blog;
import DatabaseBlogPosts from '@/components/blog-inner-pages/blog-database/DatabaseBlogPosts';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Blog - Enam Notes',
    description: 'Practical app development tutorials, technology insights, and learning resources from Enam Notes.',
};

const Blog = () => {
    return (
        <Wrapper>
            <main>
                <DatabaseBlogPosts />
            </main>
        </Wrapper>
    );
};

export default Blog;

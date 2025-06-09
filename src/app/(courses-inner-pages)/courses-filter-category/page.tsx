import CoursesFilterCategoryMain from '@/components/courses-inner-pages/courses-filter-category/CoursesFilterCategoryMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Project-base app dev course with AI",
    description: "Explore our extensive range of online courses and educational resources. Filter by category to find the perfect course for your learning needs. Join us today and start your journey towards knowledge and skill enhancement.",
    keywords: "online courses, app development, learning, skill enhancement, education,mobile app development, AI tools, project-based learning",

};

const CoursesFilterCategory = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CoursesFilterCategoryMain />
                </main>
            </Wrapper>
        </>
    );
};

export default CoursesFilterCategory;
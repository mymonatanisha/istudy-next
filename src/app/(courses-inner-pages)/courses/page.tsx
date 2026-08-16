import CoursesMain from '@/components/courses-inner-pages/courses/CoursesMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Project-base app dev course with AI",
    description: "Learn how to build a project-based app development using AI tools and techniques. This course covers everything from ideation to deployment, with a focus on practical applications.",
    keywords: "online courses, app development, learning, skill enhancement, education,mobile app development, AI tools, project-based learning",
};

const Courses = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CoursesMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Courses;
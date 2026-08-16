import CourseGridRightMain from '@/components/courses-inner-pages/course-grid-right/CourseGridRightMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Courses Grid Right - Enam Notes Online Courses",
};

const CoursesGridRight = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CourseGridRightMain />
                </main>
            </Wrapper>
        </>
    );
};

export default CoursesGridRight;
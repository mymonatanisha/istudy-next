import CourseGridFiveMain from '@/components/courses-inner-pages/courses-grid-five/CourseGridFiveMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Courses Grid - Enam Notes Online Courses",
};

const CoursesGridFive = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CourseGridFiveMain />
                </main>
            </Wrapper>
        </>
    );
};

export default CoursesGridFive;
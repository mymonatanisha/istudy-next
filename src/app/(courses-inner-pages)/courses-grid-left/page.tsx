import CourseGridLeftMain from '@/components/courses-inner-pages/course-grid-left/CourseGridLeftMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Courses Grid Left - Enam Notes Online Courses",
};

const CourseGridLeft = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CourseGridLeftMain />
                </main>
            </Wrapper>
        </>
    );
};

export default CourseGridLeft;
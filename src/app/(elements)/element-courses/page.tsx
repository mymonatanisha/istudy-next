import ElementCoursesMain from '@/components/elements/element-courses/ElementCoursesMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Courses - Enam Notes Online Courses",
};

const ElementCourses = () => {
    return (
        <>
            <Wrapper>
                <main className='main-area'>
                    <ElementCoursesMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ElementCourses;
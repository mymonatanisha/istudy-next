import AboutOnlineCourseMain from '@/components/pages/page-layout-one/about-online-course/AboutOnlineCourseMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "About Online Course - Enam Notes Online Courses",
};

const AboutOnlineCourse = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <AboutOnlineCourseMain />
                </main>
            </Wrapper>
        </>
    );
};

export default AboutOnlineCourse;
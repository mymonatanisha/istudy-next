import OnlineCourseMain from '@/components/online-course/OnlineCourseMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Master SEO & Android Coding",
};

const OnlineCourse = () => {
    return (
        <>
            <Wrapper>
                <main className="main-area">
                    <OnlineCourseMain />
                </main>
            </Wrapper>
        </>
    );
};

export default OnlineCourse;
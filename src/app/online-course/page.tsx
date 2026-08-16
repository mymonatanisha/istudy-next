import OnlineCourseMain from '@/components/online-course/OnlineCourseMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';



export const metadata: Metadata = {
    title: "Android Coding with AI",
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
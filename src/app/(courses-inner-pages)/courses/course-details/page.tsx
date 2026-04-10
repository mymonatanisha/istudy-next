import CoursesDetailsMain from '@/components/courses-inner-pages/courses/course-details/CoursesDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Course Details | Enam Notes",
    openGraph: {
        title: "Course Details | Enam Notes",
        siteName: "Enam Notes",
        type: "website",
        url: "https://enamnotes.com/courses/course-details",
    },
};

const CourseDetails = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CoursesDetailsMain courseId={1} />
                </main>
            </Wrapper>
        </>
    );
};

export default CourseDetails;

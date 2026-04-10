import CoursesLassonMain from '@/components/courses-inner-pages/course-lesson/CoursesLassonMain';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Course Lesson - Enam Notes Online Courses",
};

const CourseLesson = () => {
    return (
        <>
            <main>
                <CoursesLassonMain />
            </main>
        </>
    );
};

export default CourseLesson;
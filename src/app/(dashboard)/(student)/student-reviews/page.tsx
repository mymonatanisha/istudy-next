import StudentReviewsMain from '@/components/dashboard/student/student-reviews/StudentReviewsMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Reviews - Enam Notes Online Courses",
};

const StudentReviews = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                        <StudentReviewsMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentReviews;
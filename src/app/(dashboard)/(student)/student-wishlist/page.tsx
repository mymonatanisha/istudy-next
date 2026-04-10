import StudentWishlistMain from '@/components/dashboard/student/student-wishlist/StudentWishlistMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Wishlist - Enam Notes Online Courses",
};

const StudentWishlist = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                        <StudentWishlistMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentWishlist;
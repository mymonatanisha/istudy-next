import InstructorWishlistMain from '@/components/dashboard/instructor/instructor-wishlist/InstructorWishlistMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Wishlist - Enam Notes Online Courses",
};

const InstructorWishlist = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                    <InstructorWishlistMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorWishlist;
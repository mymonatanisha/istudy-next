import InstructorProfileMain from '@/components/dashboard/instructor/instructor-profile/InstructorProfileMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Profile - Enam Notes Online Courses",
};

const InstructorProfile = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                    <InstructorProfileMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorProfile;
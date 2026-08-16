import InstructorDashboardMain from '@/components/dashboard/instructor/instructor-dashboard/InstructorDashboardMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Dashboard - Enam Notes Online Courses",
};

const InstructorDashboard = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                    <InstructorDashboardMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorDashboard;
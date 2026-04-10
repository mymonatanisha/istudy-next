import InstructorAnalyticsMain from '@/components/dashboard/instructor/instructor-analytics/InstructorAnalyticsMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Analytics - Enam Notes Online Courses",
};

const InstructorAnalytics = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                    <InstructorAnalyticsMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorAnalytics;
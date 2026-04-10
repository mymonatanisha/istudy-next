import InstructorSettingsMain from '@/components/dashboard/instructor/instructor-settings/InstructorSettingsMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Settings - Enam Notes Online Courses",
};

const InstructorSettings = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                        <InstructorSettingsMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorSettings;
import StudentSettingsMain from '@/components/dashboard/student/student-settings/StudentSettingsMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Settings - Enam Notes Online Courses",
};

const StudentSettings = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                    <StudentSettingsMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentSettings;
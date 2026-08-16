import StudentAssignmentMain from '@/components/dashboard/student/assignment/StudentAssignmentMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Assignment - Enam Notes Online Courses",
};

const StudentAssignment = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                    <StudentAssignmentMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentAssignment;
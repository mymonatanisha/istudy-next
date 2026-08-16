import InstructorAssignmentsMain from '@/components/dashboard/instructor/instructor-assignments/InstructorAssignmentsMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Assignments - Enam Notes Online Courses",
};

const InstructorAssignment = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                        <InstructorAssignmentsMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorAssignment;
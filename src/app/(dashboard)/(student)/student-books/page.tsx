import StudentBooksMain from '@/components/dashboard/student/student-books/StudentBooksMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Books - Enam Notes Online Courses",
};

const StudentBooks = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                    <StudentBooksMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentBooks;
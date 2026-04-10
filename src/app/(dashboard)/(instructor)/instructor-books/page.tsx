import InstructorBooksMain from '@/components/dashboard/instructor/instructor-books/InstructorBooksMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Books - Enam Notes Online Courses",
};

const InstructorBooks = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                    <InstructorBooksMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorBooks;
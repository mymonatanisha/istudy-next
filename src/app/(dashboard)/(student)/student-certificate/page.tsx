import StudentCertificateMain from '@/components/dashboard/student/student-certificate/StudentCertificateMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Certificate - Enam Notes Online Courses",
};

const StudentCertificate = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                    <StudentCertificateMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentCertificate;
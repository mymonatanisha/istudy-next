import InstructorCertificateMain from '@/components/dashboard/instructor/instructor-certificate/InstructorCertificateMain';
import Wrapper from '@/layout/DefaultWrapper';
import InstructorDashboardLayout from '@/layout/InstructorDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Certificate - Enam Notes Online Courses",
};

const InstructorCertificate = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDashboardLayout>
                        <InstructorCertificateMain />
                    </InstructorDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorCertificate;
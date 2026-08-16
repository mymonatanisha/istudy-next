import PurchaseHistoryMain from '@/components/dashboard/student/purchase-history/PurchaseHistoryMain';
import Wrapper from '@/layout/DefaultWrapper';
import StudentDashboardLayout from '@/layout/StudentDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Student Purchase History - Enam Notes Online Courses",
};

const StudentPurchaseHistory = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <StudentDashboardLayout>
                        <PurchaseHistoryMain />
                    </StudentDashboardLayout>
                </main>
            </Wrapper>
        </>
    );
};

export default StudentPurchaseHistory;
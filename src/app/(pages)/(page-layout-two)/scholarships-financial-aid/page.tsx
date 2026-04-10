import ScholarshipFinancialMain from '@/components/pages/page-layout-two/scholarships-financial-aid/ScholarshipFinancialMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Scholarship Financial - Enam Notes Online Courses",
};

const ScholarshipFinancial = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ScholarshipFinancialMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ScholarshipFinancial;
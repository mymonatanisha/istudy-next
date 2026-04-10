import ExecutiveLeadersMain from '@/components/pages/page-layout-two/executive-leaders/ExecutiveLeadersMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Executive Leaders - Enam Notes Online Courses",
};

const ExecutiveLeaders = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ExecutiveLeadersMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ExecutiveLeaders;
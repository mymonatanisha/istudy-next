import HistoryMain from '@/components/pages/page-layout-one/history/HistoryMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "History - Enam Notes Online Courses",
};

const History = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <HistoryMain />
                </main>
            </Wrapper>
        </>
    );
};

export default History;
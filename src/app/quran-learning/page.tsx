import QuranLearingMain from '@/components/quran-learning/QuranLearingMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Quran Learning - Enam Notes Online Courses",
};

const QuranLearning = () => {
    return (
        <>
            <Wrapper>
                <main className='main-area'>
                    <QuranLearingMain />
                </main>
            </Wrapper>
        </>
    );
};

export default QuranLearning;
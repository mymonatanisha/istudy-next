import AboutQuranLearningMain from '@/components/pages/page-layout-one/about-quran-learning/AboutQuranLearningMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "About Quran Learning - Enam Notes Online Courses",
};

const AboutQuranLearning = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <AboutQuranLearningMain />
                </main>
            </Wrapper>
        </>
    );
};

export default AboutQuranLearning;
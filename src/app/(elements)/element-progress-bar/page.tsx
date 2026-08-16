import ElementProgressBarMain from '@/components/elements/element-progress-bar/ElementProgressBarMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Progress Bar - Enam Notes Online Courses",
};

const Progressbar = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ElementProgressBarMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Progressbar;
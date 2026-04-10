import ProgramDetailsMain from '@/components/courses-inner-pages/program-details/ProgramDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Program Details - Enam Notes Online Courses",
};

const ProgramDetails = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ProgramDetailsMain programId={1} />
                </main>
            </Wrapper>
        </>
    );
};

export default ProgramDetails;
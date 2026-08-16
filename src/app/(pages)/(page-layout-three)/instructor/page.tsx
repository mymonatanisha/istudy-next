import InstructorMainArea from '@/components/pages/page-layout-three/Instructor/InstructorMainArea';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor - Enam Notes Online Courses",
};

const Instructor = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorMainArea />
                </main>
            </Wrapper>
        </>
    );
};

export default Instructor;
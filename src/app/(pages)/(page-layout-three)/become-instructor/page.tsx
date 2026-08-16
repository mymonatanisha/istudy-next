import BecomeInstructorMain from '@/components/pages/page-layout-three/become-instructor/BecomeInstructorMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Become Instructor - Enam Notes Online Courses",
};

const BecomeInstructor = () => {
    return (
        <Wrapper>
            <main>
                <BecomeInstructorMain />
            </main>
        </Wrapper>
    );
};

export default BecomeInstructor;
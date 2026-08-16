import InstructorDetailsMain from '@/components/pages/page-layout-three/Instructor/Instructor-details/InstructorDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Instructor Details - Enam Notes Online Courses",
};

const InstructorDetails = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <InstructorDetailsMain id={1} />
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorDetails;
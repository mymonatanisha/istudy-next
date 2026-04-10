import WebbinarDetailsMain from '@/components/pages/page-layout-three/webinar-details/WebbinarDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Webinar Details - Enam Notes Online Courses",
};

const WebinarDetails = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <WebbinarDetailsMain />
                </main>
            </Wrapper>
        </>
    );
};

export default WebinarDetails;
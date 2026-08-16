import EventMain from '@/components/pages/page-layout-three/event/EventMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Event - Enam Notes Online Courses",
};

const Event = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <EventMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Event;
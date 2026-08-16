import EventListMain from '@/components/pages/page-layout-three/event-list/EventListMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Event List - Enam Notes Online Courses",
};

const EventList = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <EventListMain />
                </main>
            </Wrapper>
        </>
    );
};

export default EventList;
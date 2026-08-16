import EventDetailsMain from "@/components/pages/page-layout-three/event/event-details/EventDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Event Details - Enam Notes Online Courses",
};

interface PageProps {
    params: Promise<{ id: number }>;
}

const EventDetails = async (props: PageProps) => {
    const params = await props.params;
    const { id } = params;

    return (
        <>
            <Wrapper>
                <main>
                    <EventDetailsMain id={id} />
                </main>
            </Wrapper>
        </>
    );
};

export default EventDetails;

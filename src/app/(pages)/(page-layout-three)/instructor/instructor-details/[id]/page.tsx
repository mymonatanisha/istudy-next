import InstructorDetailsMain from "@/components/pages/page-layout-three/Instructor/Instructor-details/InstructorDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "Instructor Details - Enam Notes Online Courses",
};

interface PageProps {
    params: Promise<{ id: string }>;
}

const InstructorDetails = async (props: PageProps) => {

    const resolvedParams = await props.params;
    const { id } = resolvedParams;
 
    const blockedInstructorIds = new Set([1, 2, 3, 5]);

    if (blockedInstructorIds.has(Number(id))) {
        redirect("/under-maintenance");
    }


    return (
        <>
            <Wrapper>
                <main>
                   <InstructorDetailsMain id={Number(id)} />
                </main>
            </Wrapper>
        </>
    );
};

export default InstructorDetails;

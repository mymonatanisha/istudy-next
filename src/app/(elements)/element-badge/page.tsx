import ElementBadgeMain from '@/components/elements/element-badge/ElementBadgeMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Style Guide - Enam Notes Online Courses",
};

const ElementBadge = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ElementBadgeMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ElementBadge;
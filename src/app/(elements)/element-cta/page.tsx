import ElementCtaMain from '@/components/elements/element-cta/ElementCtaMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "CTA - Enam Notes Online Courses",
};

const ElementCta = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ElementCtaMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ElementCta;
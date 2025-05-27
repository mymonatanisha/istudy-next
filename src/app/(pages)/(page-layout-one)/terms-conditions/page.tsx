import TermsConditionsMain from '@/components/pages/page-layout-one/terms-conditions/TermsConditionsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Terms And Conditions - EnamNotes",
    description: "Read the terms and conditions of EnamNotes, a platform dedicated to empowering beginners and students in their coding journey. Understand your rights and responsibilities while using our services.",
};

const TermsConditions = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <TermsConditionsMain />
                </main>
            </Wrapper>
        </>
    );
};

export default TermsConditions;
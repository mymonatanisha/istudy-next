import CheckoutMain from '@/components/pages/page-layout-four/checkout/CheckoutMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Checkout - Enam Notes Online Courses",
};

const Checkout = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CheckoutMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Checkout;
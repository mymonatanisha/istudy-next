import CartMain from '@/components/pages/page-layout-four/cart/CartMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Learn how to build apps with AI",
};

const Cart = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <CartMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Cart;
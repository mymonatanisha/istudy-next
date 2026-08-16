import ContactUsMain from '@/components/pages/page-layout-one/contact-us/ContactUsMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Contact Us - Enam Notes Online Courses",
};

const ContactUs = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <ContactUsMain />
                </main>
            </Wrapper>
        </>
    );
};

export default ContactUs;
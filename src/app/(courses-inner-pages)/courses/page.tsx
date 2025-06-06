import CoursesMain from '@/components/courses-inner-pages/courses/CoursesMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "Course Grid Right - Education & Online Courses React NextJs Template",
};

const Courses = () => {
    return (
        <>
            <Wrapper>
                <main>
                    {/* Adsterra Native Banner - Top of Course Filter Page */}
                    <div id="container-4f198eb91f4b0c0da094b4029c7caad6"></div>
                    <Script
                        id="adsterra-native-banner"
                        strategy="afterInteractive"
                        src="//pl26850643.profitableratecpm.com/4f198eb91f4b0c0da094b4029c7caad6/invoke.js"
                        async
                        data-cfasync="false"
                    />
                    <CoursesMain />
                </main>
            </Wrapper>
        </>
    );
};

export default Courses;
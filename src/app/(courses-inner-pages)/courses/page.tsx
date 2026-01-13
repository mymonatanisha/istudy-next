import CoursesMain from '@/components/courses-inner-pages/courses/CoursesMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "Project-base app dev course with AI",
    description: "Learn how to build a project-based app development using AI tools and techniques. This course covers everything from ideation to deployment, with a focus on practical applications.",
    keywords: "online courses, app development, learning, skill enhancement, education,mobile app development, AI tools, project-based learning",
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
import OnlineCourseMain from '@/components/online-course/OnlineCourseMain';
import Wrapper from '@/layout/DefaultWrapper';
import { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';



export const metadata: Metadata = {
    title: "Android Coding with AI",
};

const OnlineCourse = () => {
    return (
        <>
            <Wrapper>
                <main className="main-area">
                    {/* Adsterra Native Banner - Top of Courses Page */}
<div id="container-4f198eb91f4b0c0da094b4029c7caad6"></div>
<Script
  id="adsterra-native-banner"
  strategy="afterInteractive"
  src="//pl26850643.profitableratecpm.com/4f198eb91f4b0c0da094b4029c7caad6/invoke.js"
  async
  data-cfasync="false"
/>

                    <OnlineCourseMain />
                </main>
            </Wrapper>
        </>
    );
};

export default OnlineCourse;
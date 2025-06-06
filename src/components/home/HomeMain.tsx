import React from 'react';
import Script from 'next/script';
import DemoBannerArea from './DemoBannerArea';
import DemoPresentationArea from './DemoPresentationArea';
import CoursePageDemo from './CoursePageDemoSection';
//import DemoGridSection from './DemoGridSection';
import InnerPageShowcasesArea from './InnerPageShowcasesArea';
//import FeatureArea from './FeatureArea';
//import ElementsArea from './ElementsArea';
//import DemoHeaderFooterArea from './DemoHeaderFooterArea';
import HomeFaqArea from './HomeFaqArea';
//import ResponsiveArea from './ResponsiveArea';
//import ReviewArea from './ReviewArea';
//import DashboardDemoArea from './DashboardDemoArea';

const HomeMain = () => {
    return (
        <>
            <DemoBannerArea />
            <DemoPresentationArea />

            {/* Adsterra Native Banner START */}
            <div id="container-4f198eb91f4b0c0da094b4029c7caad6"></div>
            <Script
                id="adsterra-native-banner"
                strategy="afterInteractive"
                src="//pl26850643.profitableratecpm.com/4f198eb91f4b0c0da094b4029c7caad6/invoke.js"
                async
                data-cfasync="false"
            />
            {/* Adsterra Native Banner END */}
            
            <CoursePageDemo />
            { /*<DemoGridSection />*/}
             { /*<DashboardDemoArea/>*/}
            <InnerPageShowcasesArea />
            { /*<FeatureArea />*/}
            { /*<ElementsArea />*/}
            { /* <DemoHeaderFooterArea /> */}
            { /* <ReviewArea />*/}
            { /*<ResponsiveArea />*/}
            <HomeFaqArea />
        </>
    );
};

export default HomeMain;
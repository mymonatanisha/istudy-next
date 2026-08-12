import React from 'react';
import DemoBannerArea from './DemoBannerArea';
//import DemoPresentationArea from './DemoPresentationArea';
import CoursePageDemo from './CoursePageDemoSection';
//import DemoGridSection from './DemoGridSection';
//import InnerPageShowcasesArea from './InnerPageShowcasesArea';
//import FeatureArea from './FeatureArea';
//import ElementsArea from './ElementsArea';
//import DemoHeaderFooterArea from './DemoHeaderFooterArea';
import HomeFaqArea from './HomeFaqArea';
//import ResponsiveArea from './ResponsiveArea';
//import ReviewArea from './ReviewArea';
//import DashboardDemoArea from './DashboardDemoArea';
import VideoCarousel from "@/components/home/VideoCarousel";
import YouTubePlaylist from "@/components/home/YouTubePlaylist";
import ShortsCarousel from "@/components/home/ShortsCarousel";
import FeaturedLearningCourses from "@/components/home/FeaturedLearningCourses";


const HomeMain = () => {
    return (
        <>
            <DemoBannerArea />
            { /*<DemoPresentationArea />*/ }
           
            { /*<DemoGridSection />*/}
            { /*<DashboardDemoArea/>*/}
            <FeaturedLearningCourses />
            <YouTubePlaylist />
            <VideoCarousel />
            <CoursePageDemo />
            <ShortsCarousel />
            { /*<InnerPageShowcasesArea />*/}
            { /*<FeatureArea />*/}
            { /*<ElementsArea />*/}
            { /* <DemoHeaderFooterArea /> */}
            { /* <ReviewArea />*/}
            <HomeFaqArea />
        </>
    );
};

export default HomeMain;

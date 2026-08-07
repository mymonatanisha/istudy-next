"use client"
import Image from "next/image";
import Script from "next/script";
import instructorThumb from "../../../public/assets/images/instructor/instructor-thumb-01.webp";

const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "REPLACE_WITH_YOUTUBE_CHANNEL_ID";
const hasPlaceholderChannelId = YOUTUBE_CHANNEL_ID === "REPLACE_WITH_YOUTUBE_CHANNEL_ID";

const DemoBannerArea = () => {
    return (
        <section className="bd-demo-banner-area p-relative theme-bg bd-noise-bg fix" aria-labelledby="home-hero-title">
            <div className="container">
                <div className="row gy-30 align-items-center justify-content-center">
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                        <div className="bd-demo-banner-content text-center text-lg-start">
                            <div className="content">
                                <h1 id="home-hero-title" className="demo-banner-title mb-20">
                                    Learn Flutter & Android for Free — From Zero to Job-Ready
                                </h1>
                                <p className="demo-banner-subtitle mb-15">
                                    Free project-based tutorials for beginners. Hands-on video lessons by Enam.
                                </p>
                                <p className="demo-banner-description mb-0">
                                    Start even if you&apos;re a complete beginner and build real apps step by step.
                                </p>
                            </div>
                            <div className="hero-youtube-cta mt-30">
                                <Script src="https://apis.google.com/js/platform.js" strategy="afterInteractive" />
                                <div
                                    className="g-ytsubscribe"
                                    data-channelid={YOUTUBE_CHANNEL_ID}
                                    data-layout="default"
                                    data-theme="dark"
                                    data-count="default"
                                ></div>
                                {hasPlaceholderChannelId && (
                                    <p className="youtube-subscribe-placeholder-note mt-10 mb-0" role="note">
                                        Replace <code>NEXT_PUBLIC_YOUTUBE_CHANNEL_ID</code> in your environment with your YouTube channel ID.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-5 col-xl-5 col-lg-6">
                        <div className="demo-banner-instructor-thumb text-center text-lg-end">
                            <Image
                                src={instructorThumb}
                                alt="Instructor Enam teaching Android and Flutter app development"
                                priority
                                sizes="(max-width: 991px) 80vw, 40vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoBannerArea;

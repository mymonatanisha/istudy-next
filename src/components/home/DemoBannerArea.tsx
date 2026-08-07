"use client"
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import bannerAward from "../../../public/assets/images/landing-page/banner/award.webp";
import homethumb1 from "../../../public/assets/images/landing-page/banner/index-1.webp";
import homethumb2 from "../../../public/assets/images/landing-page/banner/index-2.webp";
import homethumb3 from "../../../public/assets/images/landing-page/banner/index-3.webp";
import homethumb4 from "../../../public/assets/images/landing-page/banner/index-4.webp";
import homethumb5 from "../../../public/assets/images/landing-page/banner/index-5.webp";
import homethumb6 from "../../../public/assets/images/landing-page/banner/index-6.webp";
import homethumb7 from "../../../public/assets/images/landing-page/banner/index-7.webp";
import MouseMoveEffect from "../common/MouseMoveEffect";

const DemoBannerArea = () => {
  // Call the custom hook here
  MouseMoveEffect();

    return (
        <div className="bd-demo-banner-area p-relative theme-bg p-relative bd-noise-bg fix">
            <div className="container">
                <div className="row gy-30 align-items-center justify-content-center">
                    <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="bd-demo-banner-content hero-content text-center">
                            <div className="demo-banner-top-inner justify-content-center wow bdFadeInUp" data-wow-delay=".3s">
                                <div className="demo-banner-top">
                                    <div className="bd-icon rating-spacing-2">
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} className="icon-star"></i>
                                        ))}
                                    </div>
                                    <div className="content">
                                        <span className="subtitle">Trusted by New Coders</span>
                                    </div>
                                </div>
                                <div className="demo-banner-top">
                                    <div className="icon">
                                        <Image src={bannerAward} alt="Award Image" />
                                    </div>
                                    <div className="content">
                                        <span className="subtitle">Founder-Led Platform</span>
                                    </div>
                                </div>
                            </div>
                            <div className="content wow bdFadeInUp" data-wow-delay=".4s">
                                <h1 className="demo-banner-title hero-title">
                                    Master App Development
                                    <span className="hero-title-break"></span>
                                    To <span className="hero-highlight">Learn, Build, Earn</span>
                                </h1>
                                <p className="hero-subtitle">Hands-On Projects to Master In-Demand Skills – From Zero to Portfolio-Worthy mobile apps.</p>
                            </div>
                            <div className="wow bdFadeInUp" data-wow-delay=".6s">
                                <Script src="https://apis.google.com/js/platform.js" strategy="afterInteractive" />
                                <div className="hero-subscribe-wrap">
                                    <div
                                        className="g-ytsubscribe"
                                        data-channelid="UCZzjuNhPoQP-ungXkMMK2JA"
                                        data-layout="full"
                                        data-count="default"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bd-banner-demo-thumb shape-move d-none d-xl-block">
                {[
                    { href: "/courses", img: homethumb1 },
                    { href: "/courses", img: homethumb2 },
                    { href: "/courses", img: homethumb3 },
                    { href: "/courses", img: homethumb4 },
                    { href: "/courses", img: homethumb5 },
                    { href: "/courses", img: homethumb6 },
                    { href: "/courses", img: homethumb7 },
                ].map(({ href, img }, index) => (
                    <div key={index} className={`thumb-shape-0${index + 1} thumb-shape-common`}>
                        <Link href={href}>
                            <Image className={`shape-${index + 1}`} src={img} style={{ width: "100%", height: "auto" }} alt="image" priority />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemoBannerArea;

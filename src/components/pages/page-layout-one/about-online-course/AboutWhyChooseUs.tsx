import Image from 'next/image';
import React from 'react';
import chooseImgOne from '../../../../../public/assets/images/choose/why-choose-img-1.webp';
import chooseImgTwo from '../../../../../public/assets/images/choose/why-choose-img-2.webp';
import chooseImgThree from '../../../../../public/assets/images/choose/why-choose-img-3.webp';
import halfCircleShape from '../../../../../public/assets/images/shape/half-circle.webp';
import secondaryPolygonShape from '../../../../../public/assets/images/shape/secondary-polygon-big.webp';
import lineCircleShape from '../../../../../public/assets/images/shape/line-circle.webp';
import primaryPolygonShape from '../../../../../public/assets/images/shape/primary-polygon.webp';
import dotShape from '../../../../../public/assets/images/shape/dot-shape.webp';
import primaryStartShape from '../../../../../public/assets/images/shape/primary-star.webp';

const AboutWhyChooseUs = () => {
    return (
        <>
            <section className="bd-why-choose-area section-space p-relative fix">
                <div className="container">
                    <div className="row gy-30 align-items-center justify-content-between">
                        <div className="col-xxl-5 col-xl-6 col-lg-6">
                            <div className="bd-section-title-wrapper">
                                <span className="bd-section-subtitle">Why Choose Enamnotes</span>
                                
                                <h2 className="bd-section-title mb-20">
                                    Why Students Choose Enamnotes for Their Learning Success
                                </h2>

                                <p className="bd-section-paragraph">
                                    At Enamnotes, we help beginners and non-technical learners build real digital skills 
                                    through simple explanations, practical projects, and step-by-step learning guidance. 
                                    Our goal is to remove confusion and make coding and digital education accessible for everyone.
                                </p>

                                <div className="bd-post-details-list">
                                    <ul>
                                        <li>Beginner-friendly learning structure</li>
                                        <li>Easy explanations designed for non-coders</li>
                                        <li>Practical project-based lessons</li>
                                        <li>Learn anytime with flexible access</li>
                                        <li>Continuous updates and supportive learning environment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <div className="p-relative">
                                <div className="bd-why-choose-thumb-wrap">
                                    <div className="thumb-column">
                                        <div className="thumb-one">
                                            <Image src={chooseImgOne} alt="Enamnotes learning experience" />
                                        </div>
                                        <div className="thumb-two">
                                            <Image src={chooseImgTwo} alt="Beginner friendly courses" />
                                        </div>
                                    </div>
                                    <div className="main-thumb">
                                        <Image src={chooseImgThree} alt="Practical digital skill building" />
                                    </div>
                                </div>

                                <div className="bd-why-shape-group d-none d-xl-block">
                                    <div className="shape-1">
                                        <Image src={halfCircleShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                    <div className="shape-2">
                                        <Image src={secondaryPolygonShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                    <div className="shape-3">
                                        <Image src={lineCircleShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                    <div className="shape-4">
                                        <Image src={primaryPolygonShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                    <div className="shape-5">
                                        <Image src={dotShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                    <div className="shape-6">
                                        <Image src={primaryStartShape} style={{ height: 'auto', width: 'auto' }} alt="shape" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutWhyChooseUs;

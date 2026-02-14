import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import circleImg from "../../../../public/assets/images/shape/about-solid-circle.webp";
import bookShapeImg from "../../../../public/assets/images/shape/about-book-shape.webp";
import aboutWaveShape from "../../../../public/assets/images/shape/about-wave-shape.webp";
import aboutCircle from "../../../../public/assets/images/shape/about-circle.webp";
import aboutThumb1 from "../../../../public/assets/images/about/about-thumb-01.webp";
import aboutThumbSmall from "../../../../public/assets/images/about/about-thumb-small-01.webp";
import dotShape from "../../../../public/assets/images/shape/dot-shape-01.webp";

interface AboutFeatureProps {
  iconClass: string;
  title: string;
  description: string;
}

const AboutFeatureItem: React.FC<AboutFeatureProps> = ({
  iconClass,
  title,
  description,
}) => (
  <div className="bd-about-feature-item">
    <div className="bd-about-feature-icon">
      <span>
        <i className={iconClass}></i>
      </span>
    </div>
    <div className="bd-about-feature-content">
      <h6 className="bd-about-feature-title">{title}</h6>
      <p className="bd-about-feature-desc">{description}</p>
    </div>
  </div>
);

interface AboutShapeProps {
  src: StaticImageData;
  alt: string;
  className: string;
}

const AboutShape: React.FC<AboutShapeProps> = ({ src, alt, className }) => (
  <div className={className}>
    <Image src={src} style={{ width: "100%", height: "auto" }} alt={alt} />
  </div>
);

const CourseAboutArea: React.FC = () => {
  return (
    <section className="bd-about-area section-space theme-bg p-relative bd-noise-bg">
      <div className="container">
        <div className="bd-about-shape-wrap">
          <AboutShape src={circleImg} alt="decorative shape" className="shape-1" />
          <AboutShape src={bookShapeImg} alt="decorative shape" className="shape-2" />
          <AboutShape src={aboutWaveShape} alt="decorative shape" className="shape-3" />
          <AboutShape src={aboutCircle} alt="decorative shape" className="shape-4" />
        </div>

        <div className="row g-5">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="bd-about-wrapper style-one">
              <div className="bd-about-thumb-inner">
                <div className="bd-about-thumb-wrapper">
                  <div className="bd-about-thumb">
                    <Image
                      src={aboutThumb1}
                      style={{ width: "100%", height: "auto" }}
                      alt="Enamnotes learning platform"
                      priority
                    />
                  </div>
                  <div className="bd-about-thumb-small">
                    <Image
                      src={aboutThumbSmall}
                      style={{ width: "100%", height: "auto" }}
                      alt="Beginner friendly learning"
                      priority
                    />
                  </div>
                </div>
                <div className="bd-about-thumb-shape">
                  <Image src={dotShape} alt="decorative shape" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="bd-about-wrapper style-one">
              <div className="bd-about-content-wrapper">
                <div className="bd-section-title-wrapper">
                  <span className="bd-section-subtitle text-secondary">
                    About Enamnotes
                  </span>

                  <h2 className="bd-section-title white-text mb-20">
                    A Simple & Practical Way To Improve Your{" "}
                    <span className="down-mark-line">Digital Skills</span>
                  </h2>

                  <p className="bd-section-paragraph has-border-sec">
                    Enamnotes is a beginner-focused digital learning platform
                    built especially for non-technical learners. We simplify
                    coding, web development, and digital skills through
                    step-by-step lessons and real-world projects that build
                    confidence and practical knowledge.
                  </p>
                </div>

                <div className="bd-about-feature-list">
                  <AboutFeatureItem
                    iconClass="icon-online-class"
                    title="Flexible Learning"
                    description="Learn at your own pace with structured, easy-to-follow lessons designed for beginners."
                  />

                  <AboutFeatureItem
                    iconClass="icon-expert-trainers"
                    title="Beginner Friendly Approach"
                    description="We explain concepts in simple language so that even non-coders can understand without confusion."
                  />

                  <AboutFeatureItem
                    iconClass="icon-career-growth"
                    title="Build Real Skills"
                    description="Work on practical projects and real tasks to gain confidence and develop job-ready digital skills."
                  />
                </div>

                <div className="bd-about-btn">
                  <Link className="bd-btn btn-secondary-white" href="/about-enamnotes">
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseAboutArea;

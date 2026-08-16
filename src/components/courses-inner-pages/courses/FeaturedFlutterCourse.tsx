import Image from "next/image";
import Link from "next/link";
import React from "react";
import { flutterCourse } from "@/data/courses/flutter-course-data";

const FeaturedFlutterCourse = () => {
    return (
        <section className="course-page-featured mb-50">
            <div className="course-page-featured-inner">
                <div className="course-page-featured-content">
                    <span className="course-page-featured-kicker">Featured Free Course</span>
                    <h2>Learn Flutter &amp; Build Real Apps</h2>
                    <p>
                        Start from Dart fundamentals and move all the way to real-world Flutter projects and app deployment.
                    </p>
                    <div className="course-page-featured-meta">
                        <span><i className="fa-light fa-book-open" /> {flutterCourse.lessons} Lessons</span>
                        <span><i className="fa-light fa-signal" /> {flutterCourse.level}</span>
                        <span><i className="fa-light fa-circle-check" /> 100% Free</span>
                    </div>
                    <Link className="bd-btn btn-primary" href={`/courses/course-details/${flutterCourse.id}`}>
                        Start Learning <span className="right-icon"><i className="fa-regular fa-arrow-right" /></span>
                    </Link>
                </div>
                <div className="course-page-featured-visual">
                    <div className="course-page-featured-badge">FREE</div>
                    <div className="course-page-featured-image">
                        <Image src={flutterCourse.image} alt="Flutter App Development" fill sizes="(max-width: 991px) 100vw, 45vw" priority />
                    </div>
                    {flutterCourse.instructorImage && (
                        <div className="course-page-featured-instructor">
                            <Image src={flutterCourse.instructorImage} alt="Instructor" width={180} height={220} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedFlutterCourse;

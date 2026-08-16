import React from 'react';
import Link from 'next/link';
import CourseGridCard from '@/components/courses-inner-pages/courses/CourseGridCard';
import { flutterCourse } from '@/data/courses/flutter-course-data';
import { androidFundamentalsCourse } from '@/data/courses/android-fundamentals-course-data';
import { androidAdvancedCourse } from '@/data/courses/android-advanced-course-data';

const FeaturedLearningCourses = () => {
    const featuredCourses = [
        flutterCourse,
        androidFundamentalsCourse,
        androidAdvancedCourse,
    ];

    return (
        <section className="bd-course-area section-space">
            <div className="container">
                <div className="row justify-content-between align-items-end g-4 mb-35">
                    <div className="col-xl-8 col-lg-8">
                        <div className="bd-section-title-wrapper">
                            <span className="bd-section-subtitle text-primary">Start Learning Today</span>
                            <h2 className="bd-section-title mb-10">Featured Learning Paths</h2>
                            <p className="bd-section-paragraph">
                                Start with Flutter or build your Android skills from fundamentals to real-world development.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 text-lg-end">
                        <Link className="bd-btn btn-outline-primary" href="/courses">
                            View All Courses
                        </Link>
                    </div>
                </div>

                <div className="row gy-30">
                    <CourseGridCard courses={featuredCourses} />
                </div>
            </div>
        </section>
    );
};

export default FeaturedLearningCourses;

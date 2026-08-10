"use client"
import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import coursesData from '@/data/courses/courses-data';
import { flutterCourse, flutterRoadmap } from '@/data/courses/flutter-course-data';
import { androidAdvancedCourse } from '@/data/courses/android-advanced-course-data';
import { androidFundamentalsCourse, androidFundamentalsRoadmap } from '@/data/courses/android-fundamentals-course-data';
import { gitGithubCourse, gitGithubRoadmap } from '@/data/courses/git-github-course-data';
import Image from 'next/image';
import React from 'react';
import avatarImg from '../../../../../public/assets/images/avatar/avatar.webp';
import Link from 'next/link';
import CourseWillYouLearn from './CourseWillYouLearn';
import CourseRequirements from './CourseRequirements';
import CourseCurriculum from './CourseCurriculum';
import CourseSidebarWidget from './CourseSidebarWidget';

const CoursesDetailsMain = ({ courseId }: { courseId: number }) => {
    const course = courseId === flutterCourse.id
        ? flutterCourse
        : courseId === androidAdvancedCourse.id
            ? androidAdvancedCourse
            : courseId === androidFundamentalsCourse.id
                ? androidFundamentalsCourse
                : courseId === gitGithubCourse.id
                    ? gitGithubCourse
                    : coursesData.find((item) => item.id == courseId);
    const isFlutterCourse = courseId === flutterCourse.id;
    const isAndroidAdvancedCourse = courseId === androidAdvancedCourse.id;
    const isAndroidFundamentalsCourse = courseId === androidFundamentalsCourse.id;
    const isGitGithubCourse = courseId === gitGithubCourse.id;

    return (
        <>
            <Breadcrumbs breadcrumbTitle={isFlutterCourse ? 'Flutter App Development' : isAndroidAdvancedCourse ? 'Android App Development: Beginner to Advanced' : isAndroidFundamentalsCourse ? 'Android App Development with Java/XML' : isGitGithubCourse ? 'Git & GitHub for Developers' : 'Learn Building Apps with AI'} />
            <section className="bd-course-details-area bd-course-details-top section-space-bottom">
                <div className="container">
                    <div className="row gy-30">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <div className="bd-course-details-wrapper mb-30">
                                <div className="bd-course-details-heading mb-30">
                                    <h2 className="bd-course-details-title mb--5">
                                        {course?.title}{isAndroidFundamentalsCourse ? ': Fundamentals' : isGitGithubCourse ? ': Coming Soon' : ''}
                                    </h2>
                                </div>
                                <div className="bd-course-details-meta mb-30">
                                    <div className="bd-course-author border-line-meta">
                                        <div className="thumb"><Link href="#">{course?.avatarImg ? <Image src={course.avatarImg} alt="author" /> : <Image src={avatarImg} alt="author" />}</Link>
                                        </div>
                                        <div className="authour-meta">
                                            <span className="subtitle">Created by</span>
                                            <div className="name"><Link href="/instructor/instructor-details">{course?.instructorName ? course.instructorName : "John Doe"}</Link></div>
                                        </div>
                                    </div>
                                    <div className="bd-course-details-meta-item border-line-meta">
                                        <p className="title">Total Enrolled</p>
                                        <span className="subtitle">{course?.students ?? 0}</span>
                                    </div>
                                    <div className="bd-course-details-meta-item border-line-meta">
                                        <p className="title">Last Update</p>
                                        <span className="subtitle">Updating..</span>
                                    </div>
                                    <div className="bd-course-details-meta-item">
                                        <p className="title">Category</p>
                                        <span className="subtitle"><Link href="#">{isFlutterCourse ? 'Flutter / App Development' : isAndroidAdvancedCourse ? 'Android / Java / XML' : isAndroidFundamentalsCourse ? 'Android / Java / XML' : isGitGithubCourse ? 'Git / GitHub / Developer Tools' : 'App Development'}</Link></span>
                                    </div>
                                </div>
                                <div className="bd-course-details-content mb-30">
                                    <h3 className="bd-course-details-content-title">Description</h3>
                                    <p className="description">{course?.courseDescription}</p>
                                </div>
                                <CourseWillYouLearn />
                                <CourseRequirements />
                                <CourseCurriculum
                                    roadmap={isFlutterCourse ? flutterRoadmap : isAndroidFundamentalsCourse ? androidFundamentalsRoadmap : isGitGithubCourse ? gitGithubRoadmap : undefined}
                                    courseLegacyId={isFlutterCourse ? flutterCourse.id : undefined}
                                />
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            {course ? <CourseSidebarWidget course={course} /> : <p>Course not found</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CoursesDetailsMain;
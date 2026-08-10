"use client";

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import CourseGridCard from './CourseGridCard';
import CourseListCard from '../../common/courses-card/CourseListCard';
import Breadcrumbs from '../../common/Breadcrumb/Breadcrumbs';
import NiceSelect from '@/components/elements/nice-select/NiceSelect';
import { courseOrderEnum } from '@/data/dropdown-data';
import { flutterCourse } from '@/data/courses/flutter-course-data';
import { androidAdvancedCourse } from '@/data/courses/android-advanced-course-data';
import { androidFundamentalsCourse } from '@/data/courses/android-fundamentals-course-data';
import { gitGithubCourse } from '@/data/courses/git-github-course-data';
import CoursePageSidebar from './CoursePageSidebar';
import FeaturedFlutterCourse from './FeaturedFlutterCourse';

const CoursesMain = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');

    // Keep the public Courses page focused on the four current/official learning tracks.
    // Legacy course records remain available in the data source for future use.
    const featuredCourses = useMemo(() => [
        flutterCourse,
        androidAdvancedCourse,
        androidFundamentalsCourse,
        gitGithubCourse,
    ], []);

    const filteredCourses = useMemo(() => {
        const query = searchValue.trim().toLowerCase();

        return featuredCourses.filter((course) => {
            const matchesSearch = !query || [
                course.title,
                course.courseName,
                course.courseDescription,
                ...(course.category || []),
                course.level,
            ].filter(Boolean).join(' ').toLowerCase().includes(query);

            const matchesPrice = selectedPrice === 'all'
                || (selectedPrice === 'free' && course.price === 0)
                || (selectedPrice === 'paid' && (course.price || 0) > 0);

            return matchesSearch && matchesPrice;
        });
    }, [featuredCourses, searchValue, selectedPrice]);

    const flutterVisible = filteredCourses.some((course) => course.id === flutterCourse.id);
    const regularCourses = filteredCourses.filter((course) => course.id !== flutterCourse.id);

    const selectHandler = () => { };

    return (
        <>
            <Breadcrumbs breadcrumbTitle="Explore Our Courses" />

            <section className="bd-course-area section-space course-page-redesign">
                <div className="container">
                    {flutterVisible && <FeaturedFlutterCourse />}

                    <div className="course-page-toolbar mb-30">
                        <div>
                            <span className="course-page-toolbar-eyebrow">Learn something useful today</span>
                            <h4 className="mb-0">{filteredCourses.length} Courses Available</h4>
                        </div>

                        <div className="bd-top-sorting-right d-flex flex-wrap-small align-items-center gap-15">
                            <div className="bd-layout-switcher">
                                <label className={`bd-filter-type-text bd-grid-filter-text ${isGridView ? 'active' : ''}`}>Grid</label>
                                <label className={`bd-filter-type-text bd-list-filter-text ${!isGridView ? 'active' : ''}`}>List</label>
                                <ul className="bd-switcher-btn">
                                    <li>
                                        <button onClick={() => setIsGridView(true)} className={`bd-filter-layout-trigger bd-grid-filter-trigger ${isGridView ? 'active' : ''}`} aria-label="Grid view">
                                            <i className="fa-solid fa-grid" />
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setIsGridView(false)} className={`bd-filter-layout-trigger bd-list-filter-trigger ${!isGridView ? 'active' : ''}`} aria-label="List view">
                                            <i className="fa-solid fa-list" />
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="bd-sorting-select">
                                <NiceSelect options={courseOrderEnum} filterIcon={false} defaultCurrent={0} onChange={selectHandler} name="" className="course-orderby" />
                            </div>

                            <button type="button" className={`bd-btn btn-outline-primary course-page-filter-trigger ${isFilterOpen ? 'active' : ''}`} onClick={() => setIsFilterOpen((open) => !open)}>
                                <i className="fa-regular fa-filter" />
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className="row g-30 align-items-start">
                        {isFilterOpen && (
                            <div className="col-xl-3 col-lg-4">
                                <CoursePageSidebar
                                    searchValue={searchValue}
                                    onSearchChange={setSearchValue}
                                    selectedPrice={selectedPrice}
                                    onPriceChange={setSelectedPrice}
                                    isOpen={isFilterOpen}
                                    onClose={() => setIsFilterOpen(false)}
                                />
                            </div>
                        )}

                        <div className={isFilterOpen ? 'col-xl-9 col-lg-8' : 'col-12'}>
                            <div className={`display-layout-grid ${isGridView ? 'active' : ''}`} style={{ display: isGridView ? 'block' : 'none' }}>
                                <div className="row g-20">
                                    <CourseGridCard courses={regularCourses} />
                                </div>
                            </div>

                            <div className={`display-layout-list ${!isGridView ? 'active' : ''}`} style={{ display: !isGridView ? 'block' : 'none' }}>
                                <div className="bd-course-list with-sidebar">
                                    {regularCourses.map((item) => <CourseListCard key={item.id} course={item} />)}
                                </div>
                            </div>

                            {regularCourses.length === 0 && (
                                <div className="course-page-empty-state">
                                    <i className="fa-light fa-magnifying-glass" />
                                    <h4>No courses found</h4>
                                    <p>Try another search or switch the price filter back to all courses.</p>
                                </div>
                            )}

                            <div className="bd-course-more-btn d-flex justify-content-center mt-40">
                                <Link className="bd-btn btn-outline-border-primary" href="#">
                                    Load More <span className="right-icon"><i className="fa-duotone fa-spinner" /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CoursesMain;

"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import CourseGridCard from './CourseGridCard';
import CourseListCard from '../../common/courses-card/CourseListCard';
import coursesData from '@/data/courses/courses-data';
import AdBoxCard from '../../common/courses-card/AdBoxCard';
import { courseOrderEnum } from '@/data/dropdown-data';
import Breadcrumbs from '../../common/Breadcrumb/Breadcrumbs';
import NiceSelect from '@/components/elements/nice-select/NiceSelect';

const CoursesMain = () => {
    const [isGridView, setIsGridView] = useState(true);

    const handleGridClick = () => {
        setIsGridView(true);
    };
    const handleListClick = () => {
        setIsGridView(false);
    };
    const selectHandler = () => { }
    
    return (
        <>
            <Breadcrumbs breadcrumbTitle='Advanced Course Filter' />
            <section className="bd-course-area section-space">
                <div className="container">
                    <div className="row g-30 align-items-center justify-content-between mb-30">
                        <div className="course-top-meta d-flex-between flex-wrap-small mb-30 gap-30">
                            <div className="bd-top-sorting-left">
                                <h6 className="bd-sorting-item-found">We found <span>15</span> courses available for you</h6>
                            </div>
                            <div className="bd-top-sorting-right d-flex flex-wrap-small align-items-center gap-15">
                                <div className="bd-layout-switcher">
                                    <label className={`bd-filter-type-text bd-grid-filter-text ${isGridView ? "active" : ""}`}>Grid</label>
                                    <label className={`bd-filter-type-text bd-list-filter-text ${!isGridView ? "active" : ""}`}>List</label>
                                    <ul className="bd-switcher-btn">
                                        <li><button onClick={handleGridClick} className={`bd-filter-layout-trigger bd-grid-filter-trigger ${isGridView ? "active" : ""}`}><i className="fa-solid fa-grid"></i></button></li>
                                        <li><button onClick={handleListClick} className={`bd-filter-layout-trigger bd-list-filter-trigger ${!isGridView ? "active" : ""}`}><i className="fa-solid fa-list"></i></button></li>
                                    </ul>
                                </div>
                                <div className="bd-sorting-select">
                                    <NiceSelect options={courseOrderEnum} filterIcon={true} defaultCurrent={0} onChange={selectHandler} name="" className="course-orderby" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-30">
                        <div className="col-12">
                            <div className={`display-layout-grid ${isGridView ? "active" : ""}`} style={{ height: isGridView ? "auto" : "0", overflow: "hidden" }}>
                                <div className="row g-30"><CourseGridCard /></div>
                            </div>
                            <div className={`display-layout-list ${!isGridView ? "active" : ""}`} style={{ height: !isGridView ? "auto" : "0", overflow: "hidden" }}>
                                <div className="bd-course-list with-sidebar">
                                    {coursesData.slice(22, 32).map((item) => (
                                        item.type === "course" ? <CourseListCard key={item.id} course={item} /> : <AdBoxCard key={item.id} adbox={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="bd-course-more-btn d-flex justify-content-center mt-50">
                                <Link className="bd-btn btn-outline-border-primary" href="#">Load More <span className="right-icon"><i className="fa-duotone fa-spinner"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default CoursesMain;

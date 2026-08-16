"use client";

import React from "react";

interface CoursePageSidebarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    selectedPrice: "all" | "free" | "paid";
    onPriceChange: (value: "all" | "free" | "paid") => void;
    isOpen: boolean;
    onClose: () => void;
}

const CoursePageSidebar = ({
    searchValue,
    onSearchChange,
    selectedPrice,
    onPriceChange,
    isOpen,
    onClose,
}: CoursePageSidebarProps) => {
    return (
        <>
            {isOpen && <button className="course-page-filter-backdrop" aria-label="Close filters" onClick={onClose} />}
            <aside className={`course-page-sidebar ${isOpen ? "is-open" : ""}`}>
                <div className="course-page-sidebar-header">
                    <div>
                        <span className="course-page-sidebar-eyebrow">Course Discovery</span>
                        <h5 className="mb-0">Filters</h5>
                    </div>
                    <button type="button" className="course-page-sidebar-close" onClick={onClose} aria-label="Close filters">
                        <i className="fa-regular fa-xmark" />
                    </button>
                </div>

                <div className="course-page-filter-group">
                    <h6>Search</h6>
                    <div className="course-page-search">
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search courses..."
                            aria-label="Search courses"
                        />
                        <i className="fa-regular fa-magnifying-glass" />
                    </div>
                </div>

                <div className="course-page-filter-group">
                    <h6>Categories</h6>
                    <label><input type="checkbox" defaultChecked /> <span>All Courses</span></label>
                    <label><input type="checkbox" /> <span>App Development</span></label>
                    <label><input type="checkbox" /> <span>Programming</span></label>
                    <label><input type="checkbox" /> <span>Design</span></label>
                    <label><input type="checkbox" /> <span>Business &amp; Marketing</span></label>
                </div>

                <div className="course-page-filter-group">
                    <h6>Level</h6>
                    <label><input type="checkbox" defaultChecked /> <span>All Levels</span></label>
                    <label><input type="checkbox" /> <span>Beginner</span></label>
                    <label><input type="checkbox" /> <span>Intermediate</span></label>
                    <label><input type="checkbox" /> <span>Advanced</span></label>
                </div>

                <div className="course-page-filter-group">
                    <h6>Price</h6>
                    <label>
                        <input type="radio" name="course-price" checked={selectedPrice === "all"} onChange={() => onPriceChange("all")} />
                        <span>All Courses</span>
                    </label>
                    <label>
                        <input type="radio" name="course-price" checked={selectedPrice === "free"} onChange={() => onPriceChange("free")} />
                        <span>Free</span>
                    </label>
                    <label>
                        <input type="radio" name="course-price" checked={selectedPrice === "paid"} onChange={() => onPriceChange("paid")} />
                        <span>Paid</span>
                    </label>
                </div>

                <div className="course-page-sidebar-tip">
                    <span><i className="fa-regular fa-lightbulb-on" /></span>
                    <div>
                        <strong>New to EnamNotes?</strong>
                        <p>Start with our free courses and learn at your own pace.</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default CoursePageSidebar;

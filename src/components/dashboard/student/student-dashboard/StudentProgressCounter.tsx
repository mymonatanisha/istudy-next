"use client";

import CountUpContent from "@/components/common/counter/CountUpContent";
import { ICounterItem } from "@/interFace/dashboard-interface";
import React, { useEffect, useState } from "react";

const StudentProgressCounter: React.FC = () => {
    const [counterData, setCounterData] = useState<ICounterItem[]>([
        { icon: "fa-solid fa-book-open", count: 0, text: "Total Courses Taken" },
        { icon: "fa-solid fa-user-check", count: 0, text: "Courses Enrolled" },
        { icon: "fa-solid fa-book-reader", count: 0, text: "Active Courses" },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnrollmentData = async () => {
            try {
                const response = await fetch('/api/student/enrollments');
                
                if (!response.ok) {
                    if (response.status === 401) {
                        // User not logged in - keep default zeros
                        setLoading(false);
                        return;
                    }
                    throw new Error('Failed to fetch enrollment data');
                }

                const data = await response.json();
                
                if (data.success && data.enrollments) {
                    const totalCourses = data.enrollments.length;
                    const activeCourses = data.enrollments.filter(
                        (e: { status: string }) => e.status === 'active'
                    ).length;

                    setCounterData([
                        { icon: "fa-solid fa-book-open", count: totalCourses, text: "Total Courses Taken" },
                        { icon: "fa-solid fa-user-check", count: totalCourses, text: "Courses Enrolled" },
                        { icon: "fa-solid fa-book-reader", count: activeCourses, text: "Active Courses" },
                    ]);
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching enrollment data:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchEnrollmentData();
    }, []);

    if (loading) {
        return (
            <>
                {[1, 2, 3].map((index) => (
                    <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-counter-wrapper bd-counter-style-six">
                            <div className="bd-counter-item">
                                <div className="bd-counter-content">
                                    <span className="bd-counter-icon bg-two">
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    </span>
                                    <h2 className="bd-counter-title">...</h2>
                                    <p>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    if (error) {
        console.warn('Error loading counters, showing defaults:', error);
        // Show default values on error (graceful degradation)
    }

    return (
        <>
            {counterData.map((item, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div className="bd-counter-wrapper bd-counter-style-six">
                        <div className="bd-counter-item">
                            <div className="bd-counter-content">
                                <span className="bd-counter-icon bg-two">
                                    <i className={item.icon}></i>
                                </span>
                                <h2 className="bd-counter-title">
                                    <CountUpContent number={item.count} text={item.symbol || ""} />
                                </h2>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default StudentProgressCounter;

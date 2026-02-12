"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Enrollment = {
    id: number;
    courseName: string;
    courseSlug: string;
    instructor: string;
    enrolledAt: string;
    progress: number;
    status: string;
};

const EnrolledCoursesTable: React.FC = () => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await fetch('/api/student/enrollments');
                
                if (!response.ok) {
                    if (response.status === 401) {
                        // User not logged in
                        setLoading(false);
                        return;
                    }
                    throw new Error('Failed to fetch enrollments');
                }

                const data = await response.json();
                
                if (data.success && data.enrollments) {
                    setEnrollments(data.enrollments);
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching enrollments:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'badge-warning';
            case 'completed':
                return 'badge-success';
            case 'expired':
                return 'badge-danger';
            default:
                return 'badge-secondary';
        }
    };

    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'Ongoing';
            case 'completed':
                return 'Completed';
            case 'expired':
                return 'Expired';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="bd-dashboard-course-table table-responsive">
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    <p className="mt-3">Loading your enrolled courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bd-dashboard-course-table table-responsive">
                <div className="alert alert-warning text-center">
                    <i className="fa-solid fa-exclamation-triangle"></i> Unable to load enrollments. Please try again later.
                </div>
            </div>
        );
    }

    if (enrollments.length === 0) {
        return (
            <div className="bd-dashboard-course-table table-responsive">
                <div className="text-center py-5">
                    <i className="fa-solid fa-book-open fa-3x mb-3 text-muted"></i>
                    <h5>No Enrolled Courses Yet</h5>
                    <p className="text-muted">You haven&apos;t enrolled in any courses. Browse our course catalog to get started!</p>
                    <Link href="/courses" className="bd-btn btn-style radius-6 mt-3">
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bd-dashboard-course-table table-responsive">
            <table className="table table-head-bg">
                <thead>
                    <tr>
                        <th style={{ minWidth: "300px" }}>Course Name</th>
                        <th style={{ minWidth: "194px" }}>Instructor</th>
                        <th>Enrolled Date</th>
                        <th>Progress</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td>
                                <Link href={`/course-details/${enrollment.courseSlug}`} className="text-decoration-none">
                                    {enrollment.courseName}
                                </Link>
                            </td>
                            <td>{enrollment.instructor}</td>
                            <td>{formatDate(enrollment.enrolledAt)}</td>
                            <td>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div 
                                        className="progress-bar bg-success" 
                                        role="progressbar" 
                                        style={{ width: `${enrollment.progress}%` }}
                                        aria-valuenow={enrollment.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>
                                <small className="text-muted">{enrollment.progress}%</small>
                            </td>
                            <td>
                                <div className={`bd-badge ${getStatusBadgeClass(enrollment.status)}`}>
                                    {getStatusText(enrollment.status)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledCoursesTable;

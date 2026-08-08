"use client";

import React, { useEffect, useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";

interface Enrollment {
  id: number;
  courseName: string;
  courseSlug: string;
  instructor: string;
  instructorAvatar?: string | null;
  thumbnail?: string | null;
  enrolledAt: string;
  progress: number;
  status: string;
  lessons: number;
  price: number;
}

const StudentEnrolledCoursesMain = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const response = await fetch("/api/student/enrollments");

        if (response.status === 401) {
          setError("Please sign in to view your enrolled courses.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load enrolled courses.");
        }

        const data = await response.json();
        setEnrollments(data.success ? data.enrollments ?? [] : []);
      } catch (err) {
        console.error("Error loading enrolled courses:", err);
        setError("Unable to load your enrolled courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="bd-dashboard-inner">
        <div className="bd-dashboard-enrolled-courses">
          <div className="bd-dashboard-title-inner">
            <h4 className="bd-dashboard-title">Enrolled Courses</h4>
          </div>

          {loading && (
            <div className="text-center py-5">
              <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
              <p className="mt-3">Loading your courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-warning text-center">{error}</div>
          )}

          {!loading && !error && enrollments.length === 0 && (
            <div className="text-center py-5">
              <i className="fa-solid fa-book-open fa-3x mb-3 text-muted"></i>
              <h5>No Enrolled Courses Yet</h5>
              <p className="text-muted">
                Enroll in a course and it will appear here.
              </p>
            </div>
          )}

          {!loading && !error && enrollments.length > 0 && (
            <div className="row g-30">
              {enrollments.map((enrollment) => (
                <div
                  className="col-xl-6 col-lg-6 col-md-12"
                  key={enrollment.id}
                >
                  <EnrolledCourseCard course={enrollment} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEnrolledCoursesMain;

"use client";

import Link from "next/link";
import React from "react";

type EnrolledCourse = {
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
};

const EnrolledCourseCard = ({ course }: { course: EnrolledCourse }) => {
  return (
    <div className="bd-course-wrapper style-two h-100">
      <Link
        href={`/courses/course-details/${course.courseSlug}`}
        className="bd-course-thumb-wrapper bd-course-thumb-style-three p-relative d-block"
      >
        <div className="bd-course-thumb-bg">
          {course.thumbnail ? (
            // The existing database course thumbnail is trusted application data.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.thumbnail} alt={course.courseName} className="w-100" />
          ) : (
            <div className="p-5 text-center">Course</div>
          )}
        </div>
        <div className="bd-course-badge">
          <span className="bd-badge badge-primary">FREE</span>
        </div>
      </Link>

      <div className="bd-course-content">
        <div className="bd-course-meta d-flex-between mb-15">
          <span className="bd-badge badge-outline-light badge-transparent">Enrolled</span>
          <span><i className="fa-light fa-book"></i> {course.lessons} Lessons</span>
        </div>

        <h5 className="bd-course-title underline mb-10">
          <Link href={`/courses/course-details/${course.courseSlug}`}>
            {course.courseName}
          </Link>
        </h5>

        <p className="mb-15">Instructor: {course.instructor}</p>

        <div className="mb-15">
          <div className="d-flex-between mb-5">
            <span>Progress</span>
            <strong>{course.progress}%</strong>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${course.progress}%` }}
              aria-valuenow={course.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <Link
          className="bd-btn btn-style radius-6 w-100 text-center"
          href={`/courses/course-details/${course.courseSlug}`}
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

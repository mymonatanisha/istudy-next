import CoursesDetailsMain from "@/components/courses-inner-pages/courses/course-details/CoursesDetailsMain";
import coursesData from "@/data/courses/courses-data";
import { flutterCourse } from "@/data/courses/flutter-course-data";
import { androidFundamentalsCourse } from "@/data/courses/android-fundamentals-course-data";
import { gitGithubCourse } from "@/data/courses/git-github-course-data";
import { androidAdvancedCourse } from "@/data/courses/android-advanced-course-data";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

const SITE_NAME = "Enam Notes";
const DEFAULT_COURSE_DESCRIPTION = "Explore practical app development courses from Enam Notes.";
const ALL_COURSES = [...coursesData, flutterCourse, androidFundamentalsCourse, gitGithubCourse, androidAdvancedCourse];
const COURSES_BY_ID = new Map(ALL_COURSES.map((course) => [Number(course.id), course]));

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const resolvedParams = await props.params;
  const parsedCourseId = Number(resolvedParams.courseId);
  const courseId = Number.isFinite(parsedCourseId) ? parsedCourseId : null;
  const course = courseId !== null ? COURSES_BY_ID.get(courseId) : undefined;
  const courseTitle = course?.title?.trim();
  const title = courseTitle ? `${courseTitle} | ${SITE_NAME}` : `Course Details | ${SITE_NAME}`;
  const description = course?.courseDescription?.trim() ?? DEFAULT_COURSE_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: courseId !== null
        ? `https://enamnotes.com/courses/course-details/${courseId}`
        : "https://enamnotes.com/courses/course-details",
    },
  };
};

const CourseDetails = async (props: PageProps) => {
  const resolvedParams = await props.params;
  const parsedCourseId = Number(resolvedParams.courseId);
  const courseId = Number.isFinite(parsedCourseId) ? parsedCourseId : 1;

  return (
    <Wrapper>
      <main>
        <CoursesDetailsMain courseId={courseId} />
      </main>
    </Wrapper>
  );
};

export default CourseDetails;
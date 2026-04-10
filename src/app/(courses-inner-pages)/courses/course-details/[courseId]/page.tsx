import CoursesDetailsMain from "@/components/courses-inner-pages/courses/course-details/CoursesDetailsMain";
import coursesData from "@/data/courses/courses-data";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

const SITE_NAME = "Enam Notes";
const DEFAULT_COURSE_DESCRIPTION =
  "Explore practical app development courses from Enam Notes.";

interface PageProps {
  params: Promise<{ courseId: number }>;
}

export const generateMetadata = async (
  props: PageProps
): Promise<Metadata> => {
  const resolvedParams = await props.params;
  const parsedCourseId = Number(resolvedParams.courseId);
  const courseId = Number.isFinite(parsedCourseId) ? parsedCourseId : null;
  const course = courseId !== null
    ? coursesData.find((item) => Number(item.id) === courseId)
    : undefined;
  const courseTitle = course?.title?.trim();
  const title = courseTitle
    ? `${courseTitle} | ${SITE_NAME}`
    : `Course Details | ${SITE_NAME}`;
  const description =
    course?.courseDescription?.trim() ?? DEFAULT_COURSE_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      url:
        courseId !== null
          ? `https://enamnotes.com/courses/course-details/${courseId}`
          : "https://enamnotes.com/courses/course-details",
    },
  };
};

const CourseDetails = async (props: PageProps) => {
  const resolvedParams = await props.params;
  const { courseId } = resolvedParams;
  const isTargetCourse = String(courseId) === "35";
  const courseJsonLd = isTargetCourse
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Build your first real mobile app from scratch",
        description:
          "Project-based app development course designed for beginners, freelancers, and small business owners.",
        provider: {
          "@type": "Organization",
          name: "Enam Notes",
          sameAs: "https://enamnotes.com",
        },
        url: "https://enamnotes.com/courses/course-details/35",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "39",
            url: "https://enamnotes.com/courses/course-details/35",
            availability: "https://schema.org/InStock",
          },
        },
      }
    : null;
  const courseJsonLdString = courseJsonLd
    ? JSON.stringify(courseJsonLd)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029")
    : null;

  return (
    <>
      {courseJsonLdString ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: courseJsonLdString }}
        />
      ) : null}
      <Wrapper>
        <main>
          <CoursesDetailsMain courseId={courseId} />
        </main>
      </Wrapper>
    </>
  );
};

export default CourseDetails;

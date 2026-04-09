import CoursesDetailsMain from "@/components/courses-inner-pages/courses/course-details/CoursesDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Course Details - Education & Online Courses React NextJs Template",
};

interface PageProps {
  params: Promise<{ courseId: number }>;
}

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
    ? JSON.stringify(courseJsonLd).replace(/</g, "\\u003c")
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

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import curriculamData from "@/data/courses/course-curriculam-data";
import { flutterQuickShorts } from "@/data/courses/flutter-course-data";
import type { FlutterQuickShort, FlutterRoadmapSection } from "@/data/courses/flutter-course-data";

interface ProgressLesson {
    id: number;
    title: string;
    isCompleted: boolean;
    progress: number;
}

interface CourseCurriculumProps {
    roadmap?: FlutterRoadmapSection[];
    courseLegacyId?: number;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ roadmap, courseLegacyId }) => {
    const sections = roadmap ?? (curriculamData as FlutterRoadmapSection[]);
    const isFlutterCourse = Boolean(roadmap && courseLegacyId);
    const [lessons, setLessons] = useState<ProgressLesson[]>([]);
    const [courseProgress, setCourseProgress] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [savingLessonId, setSavingLessonId] = useState<number | null>(null);

    useEffect(() => {
        if (!isFlutterCourse || !courseLegacyId) return;

        fetch(`/api/student/course-progress?courseLegacyId=${courseLegacyId}`)
            .then(async (response) => {
                if (!response.ok) return null;
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                setIsEnrolled(true);
                setCourseProgress(data.courseProgress ?? 0);
                setLessons(data.lessons ?? []);
            })
            .catch(() => undefined);
    }, [courseLegacyId, isFlutterCourse]);

    const getLessonProgress = (title: string) => lessons.find((lesson) => lesson.title === title);

    const toggleLesson = async (lessonId: number, isCompleted: boolean) => {
        if (!courseLegacyId) return;
        setSavingLessonId(lessonId);
        try {
            const response = await fetch("/api/student/course-progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseLegacyId, lessonId, isCompleted }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to update progress");

            setCourseProgress(data.courseProgress ?? 0);
            setLessons((current) => current.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, isCompleted, progress: isCompleted ? 100 : 0 } : lesson
            ));
        } catch (error) {
            console.error("Unable to update lesson progress:", error);
        } finally {
            setSavingLessonId(null);
        }
    };

    const renderShort = (short: FlutterQuickShort) => (
        <div key={short.videoUrl} className="bd-course-curriculum-content d-flex-between">
            <div className="bd-course-curriculum-info d-flex-items gap-10">
                <div className="icon">
                    <i className="fa-brands fa-youtube"></i>
                </div>
                <p className="title mb-0">{short.title}</p>
            </div>
            <a
                href={short.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-primary"
            >
                Watch Short
            </a>
        </div>
    );

    return (
        <div className="bd-course-curriculum mb-30">
            <div className="d-flex-between mb-15">
                <h3 className="bd-course-details-content-title mb-0">Curriculum</h3>
                {isFlutterCourse && isEnrolled && (
                    <span className="fw-500">Progress: {courseProgress}%</span>
                )}
            </div>
            {isFlutterCourse && !isEnrolled && (
                <p className="mb-20">Enroll in this free course to track your roadmap progress.</p>
            )}
            <div className="accordion-common-style accordion-transparent">
                <div className="accordion" id="accordionExample">
                    {sections.map((section, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded={index === 0}
                                    aria-controls={`collapse${index}`}
                                >
                                    <span>Q.</span> {section.title}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    {section.lectures.map((lecture, lectureIndex) => {
                                        const progressLesson = getLessonProgress(lecture.title);
                                        const completed = progressLesson?.isCompleted ?? false;

                                        return (
                                            <div key={lectureIndex} className="bd-course-curriculum-content d-flex-between">
                                                <div className="bd-course-curriculum-info d-flex-items gap-10">
                                                    <div className="icon">
                                                        <i className={`fa-solid ${completed ? "fa-circle-check" : "fa-video"}`}></i>
                                                    </div>
                                                    <p className="title mb-0">{lecture.title}</p>
                                                </div>
                                                <div className="bd-course-curriculum-meta d-flex-items gap-10">
                                                    <span className="duration">{lecture.duration}</span>
                                                    {lecture.videoUrl && (
                                                        <a
                                                            href={lecture.videoUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            {lecture.videoType === "short" ? "Watch Short" : "Watch"}
                                                        </a>
                                                    )}
                                                    {isFlutterCourse && isEnrolled && progressLesson ? (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            disabled={savingLessonId === progressLesson.id}
                                                            onClick={() => toggleLesson(progressLesson.id, !completed)}
                                                            aria-label={completed ? `Mark ${lecture.title} incomplete` : `Mark ${lecture.title} complete`}
                                                        >
                                                            {savingLessonId === progressLesson.id ? "..." : completed ? "Done" : "Complete"}
                                                        </button>
                                                    ) : (
                                                        !lecture.videoUrl && <span className="status"><i className="fa-solid fa-lock"></i></span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isFlutterCourse && (
                <div className="mt-30">
                    <h3 className="bd-course-details-content-title mb-15">⚡ Flutter Quick Shorts</h3>
                    <p className="mb-15">Short videos to reinforce the main Flutter learning path.</p>
                    <div className="accordion-body p-0">
                        {flutterQuickShorts.map(renderShort)}
                    </div>
                </div>
            )}

            {!isFlutterCourse && <Link href="#" className="d-none">Curriculum</Link>}
        </div>
    );
};

export default CourseCurriculum;

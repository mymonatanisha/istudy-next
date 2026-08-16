"use client";

import React, { useEffect, useState } from "react";
import curriculamData from "@/data/courses/course-curriculam-data";
import { flutterQuickShorts } from "@/data/courses/flutter-course-data";
import type { FlutterLectureVideo, FlutterQuickShort, FlutterRoadmapSection } from "@/data/courses/flutter-course-data";

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

const getYouTubeEmbedUrl = (url: string) => {
    try {
        const parsed = new URL(url);
        const isShort = parsed.pathname.startsWith("/shorts/");
        const videoId = isShort
            ? parsed.pathname.split("/shorts/")[1]?.split("/")[0]
            : parsed.searchParams.get("v");
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
    } catch {
        return null;
    }
};

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ roadmap, courseLegacyId }) => {
    const sections = roadmap ?? (curriculamData as FlutterRoadmapSection[]);
    const isFlutterCourse = Boolean(roadmap && courseLegacyId);
    const [lessons, setLessons] = useState<ProgressLesson[]>([]);
    const [courseProgress, setCourseProgress] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [savingLessonId, setSavingLessonId] = useState<number | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

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
                <div className="icon"><i className="fa-brands fa-youtube"></i></div>
                <p className="title mb-0">{short.title}</p>
            </div>
            <a href={short.videoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                Watch Short
            </a>
        </div>
    );

    return (
        <>
            <div className="bd-course-curriculum mb-30">
                <div className="d-flex-between mb-15">
                    <h3 className="bd-course-details-content-title mb-0">Curriculum</h3>
                    {isFlutterCourse && isEnrolled && <span className="fw-500">Progress: {courseProgress}%</span>}
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
                                            const videos: FlutterLectureVideo[] =
                                                "videos" in lecture && Array.isArray(lecture.videos)
                                                    ? (lecture.videos as FlutterLectureVideo[])
                                                    : [];

                                            return (
                                                <div key={lectureIndex} className="bd-course-curriculum-content d-flex-between">
                                                    <div className="bd-course-curriculum-info d-flex-items gap-10">
                                                        <div className="icon">
                                                            <i className={`fa-solid ${completed ? "fa-circle-check" : "fa-video"}`}></i>
                                                        </div>
                                                        <p className="title mb-0">{lecture.title}</p>
                                                    </div>
                                                    <div className="bd-course-curriculum-meta d-flex-items gap-10 flex-wrap justify-content-end">
                                                        <span className="duration">{lecture.duration}</span>
                                                        {videos.map((video) => (
                                                            <button
                                                                key={video.url}
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => setSelectedVideo({ url: video.url, title: lecture.title })}
                                                            >
                                                                <i className="fa-brands fa-youtube me-1"></i>
                                                                {video.type === "short" ? "Watch Short" : "Watch"}
                                                            </button>
                                                        ))}
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
                                                        ) : !videos.length ? (
                                                            <span className="status"><i className="fa-solid fa-lock"></i></span>
                                                        ) : null}
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
            </div>

            {isFlutterCourse && (
                <div className="mt-30">
                    <h3 className="bd-course-details-content-title mb-15">⚡ Flutter Quick Shorts</h3>
                    <p className="mb-15">Short videos to reinforce the main Flutter learning path.</p>
                    <div className="accordion-body p-0">{flutterQuickShorts.map(renderShort)}</div>
                </div>
            )}

            {selectedVideo && getYouTubeEmbedUrl(selectedVideo.url) && (
                <div
                    className="modal fade show d-block"
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedVideo.title}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
                        <div className="modal-content bg-dark border-0">
                            <div className="modal-header border-0 py-2">
                                <h5 className="modal-title text-white">{selectedVideo.title}</h5>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close video" onClick={() => setSelectedVideo(null)} />
                            </div>
                            <div className="modal-body p-0">
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src={getYouTubeEmbedUrl(selectedVideo.url) ?? undefined}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseCurriculum;

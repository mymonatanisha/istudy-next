import GetRating from '@/components/common/GetRating';
import coursesData from '@/data/courses/courses-data';
import RenderTextContent from '@/utils/RenderTextContent';
import { ICourse } from '@/interFace/interFace';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CourseGridCardProps {
    courses?: ICourse[];
}

const CourseGridCard = ({ courses }: CourseGridCardProps) => {
    const displayCourses = courses ?? coursesData;

    return (
        <>
            {displayCourses.map((item) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={item.id}>
                    <article className="bd-course-wrapper style-two course-page-compact-card">
                        <Link href={`/courses/course-details/${item.id}`} className="bd-course-thumb-wrapper bd-course-thumb-style small-style p-relative course-page-compact-thumb">
                            {(item.badge || item.price === 0) && (
                                <div className="bd-course-badge">
                                    <span className={`bd-badge ${item.price === 0 ? 'badge-primary' : item.badgeClass || ''}`}>
                                        {item.price === 0 ? 'FREE' : item.badge}
                                    </span>
                                </div>
                            )}
                            <div className={`bd-course-thumb-bg ${item.imageClassName}`}>
                                <Image src={item.image} alt={item.title} />
                            </div>
                            <div className={`bd-course-thumb-instructor ${item.instructorImageClassName}`}>
                                {item.instructorImage && <Image src={item.instructorImage} alt={item.instructorName || 'Instructor'} />}
                            </div>
                            {RenderTextContent(item)}
                        </Link>

                        <div className="bd-course-content">
                            <div className="bd-course-content-bottom mb-8">
                                <div className="bd-course-lesson has-separator">
                                    <span><i className="fa-light fa-clock" /> {item.lessons || 0} Lessons</span>
                                </div>
                                {item.level && <span className="course-page-card-level">{item.level}</span>}
                            </div>

                            <h5 className="bd-course-title underline mb-8">
                                <Link href={`/courses/course-details/${item.id}`}>{item.title}</Link>
                            </h5>

                            <p className="bd-course-description mb-8">{item.courseDescription}</p>

                            <div className="bd-course-rating d-flex align-items-center gap-8 mb-15">
                                <div className="bd-course-rating-icon d-flex rating-color">
                                    <GetRating averageRating={item.rating || 0} />
                                </div>
                                <div className="bd-course-rating-text">
                                    <span>{item.rating ? `${item.rating}/5` : 'No ratings yet'}</span>
                                </div>
                            </div>

                            <div className="course-page-card-footer">
                                <span className={`course-page-card-price ${item.price === 0 ? 'is-free' : ''}`}>
                                    {item.price === 0 ? 'FREE' : `$${item.price}`}
                                </span>
                                <Link className="bd-btn btn-outline-primary course-page-card-button" href={`/courses/course-details/${item.id}`}>
                                    Enroll Now
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            ))}
        </>
    );
};

export default CourseGridCard;

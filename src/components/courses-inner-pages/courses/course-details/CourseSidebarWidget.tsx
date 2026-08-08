"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import courseVideoImg from '../../../../../public/assets/images/course/course-video.webp';
import { ICourse } from '@/interFace/interFace';
import { useDispatch } from 'react-redux';
import { cart_product } from '@/redux/slices/cartSlice';
import { wishlist_product } from '@/redux/slices/wishlistSlice';
import { useVideoModal } from '@/contextApi/VideoProvider';
import { useRouter } from 'next/navigation';

interface ICourseProps {
    course: ICourse
}

const CourseSidebarWidget = ({ course }: ICourseProps) => {
    const { playVideo } = useVideoModal();
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEnrolling, setIsEnrolling] = useState(false);

    const handleEnrollNow = async (product: ICourse) => {
        if (!product || isEnrolling) return;

        if (product.price === 0) {
            try {
                setIsEnrolling(true);
                const response = await fetch('/api/student/enrollments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseLegacyId: product.id }),
                });

                const data = await response.json();

                if (response.status === 401) {
                    router.push(`/sign-in?callbackUrl=${encodeURIComponent(`/courses/course-details/${product.id}`)}`);
                    return;
                }

                if (!response.ok) {
                    throw new Error(data.error || 'Unable to enroll in this course.');
                }

                router.push('/student-dashboard');
            } catch (error) {
                console.error('Free course enrollment failed:', error);
                window.alert(error instanceof Error ? error.message : 'Unable to enroll in this course.');
            } finally {
                setIsEnrolling(false);
            }
            return;
        }

        dispatch(cart_product(product));
        router.push(`/checkout?courseId=${product.id}`);
    }

    const handleAddToWishlist = (product: ICourse) => {
        if (product) {
            dispatch(wishlist_product(product))
        }
    }
    
    return (
        <>
            <div className="bd-course-sidebar-widget sidebar-right sidebar-sticky">
                <div className="bd-course-sidebar-widget-thumb mb-20 p-relative">
                    <Image style={{ width: "100%", height: "auto" }} src={courseVideoImg} alt="image" priority/>
                    <div className="thumb-btn">
                        <button type='button' onClick={() => playVideo("NYwp0VqQOEA", "youtube")} className="bd-video-btn popup-video has-bg">
                            <span className="icon"><i className="fa-solid fa-play"></i></span>
                        </button>
                    </div>
                </div>
                <div className="bd-course-sidebar-widget-price mb-20">
                    <div className="bd-course-price">
                        {course.price === 0 ? (
                            <span className="current-price">FREE</span>
                        ) : (
                            <>
                                <span className="current-price">${course.price}.00</span>
                                {course.discount ? <span className="old-price">${course.discount}.00</span> : null}
                            </>
                        )}
                    </div>
                </div>
             
                <div className="bd-course-sidebar-widget-btn d-flex-between flex-wrap gap-15">
                    <button
                        onClick={() => handleEnrollNow(course)}
                        disabled={isEnrolling}
                        className="bd-btn btn-primary w-100"
                        aria-label="Enroll in this course now"
                    >
                        <span className="left-icon"><i className="fal fa-graduation-cap"></i></span>
                        {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                    <button onClick={() => handleAddToWishlist(course)} className="bd-btn btn-outline-primary w-100" aria-label="Add this course to wishlist"><span className="left-icon"><i className="far fa-heart"></i></span> Add to Wishlist</button>
                </div>
            </div>
        </>
    );
};

export default CourseSidebarWidget;

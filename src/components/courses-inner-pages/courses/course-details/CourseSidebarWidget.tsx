"use client"
import Image from 'next/image';
import React from 'react';
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

    const handleEnrollNow = (product: ICourse) => {
        if (product) {
            // Add course to cart for checkout
            dispatch(cart_product(product));
            // Navigate to checkout page with course ID
            router.push(`/checkout?courseId=${product.id}`);
        }
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
                        <button type='button' onClick={() => playVideo("iZ-IylfDoEY", "youtube")} className="bd-video-btn popup-video has-bg">
                            <span className="icon"><i className="fa-solid fa-play"></i></span>
                        </button>
                    </div>
                </div>
                <div className="bd-course-sidebar-widget-price mb-20">
                    <div className="bd-course-price">
                        <span className="current-price">{`${course.price ? course.price : 1525}.00`} </span>
                        <span className="old-price">{`${course.discount ? course.discount : 100}.00`}</span>
                    </div>
                </div>
             
                <div className="bd-course-sidebar-widget-btn d-flex-between flex-wrap gap-15">
                    <button onClick={() => handleEnrollNow(course)} className="bd-btn btn-primary w-100" aria-label="Enroll in this course now"><span className="left-icon"><i
                        className="fal fa-graduation-cap"></i></span> Enroll Now</button>
                    <button onClick={() => handleAddToWishlist(course)} className="bd-btn btn-outline-primary w-100" aria-label="Add this course to wishlist"><span className="left-icon"><i
                        className="far fa-heart"></i></span> Add to Wishlist</button>
                </div>
            </div>
        </>
    );
};

export default CourseSidebarWidget;

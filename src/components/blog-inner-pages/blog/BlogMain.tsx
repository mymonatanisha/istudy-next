"use client"
import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import BasicPagination from '@/components/elements/pagination/BasicPagination';
import React from 'react';
import BlogSidebar from '@/components/common/blog/BlogSidebar';
import blogData from '@/data/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/interFace/interFace';
// swiper imports (kept if used elsewhere in this file)
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BlogMain: React.FC = () => {
    // derive visible posts inside the component (hide items where isPublished === false)
    const visibleBlogs: IBlog[] = blogData.filter(b => b.isPublished !== false);

    return (
        <>
            <Breadcrumbs breadcrumbTitle='Blog Standard' />
            {/* -- blog area start -- */}
            <section className="bd-blog-area section-space">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-xxl-8 col-lg-8">
                            <div className="row gy-30">
                                {
                                    // use visibleBlogs instead of blogData so unpublished items are skipped
                                    visibleBlogs.slice(16, 22).map((blog, index) => (
                                        <div className="col-xl-12 col-lg-12 col-md-12" key={index}>
                                            <article className={`${blog.boxShadowClass == true ? "bd-blog bd-blog-wrapper blog-standard" : "post-details-blockquote"} `}>
                                                {blog.type === 'image' && (
                                                    <div className="bd-blog-thumb">
                                                        <Link href={`/blog/blog-details/${blog.id}`}>
                                                            {blog.image && <Image src={blog.image} style={{ width: "100%", height: "auto" }} alt="image" />}
                                                        </Link>
                                                    </div>
                                                )}
                                                {blog.type === 'slider' && (
                                                    <div className="bd-postbox-slider p-relative">
                                                        <div className="p-r">
                                                            <Swiper
                                                                modules={[Navigation, Pagination]}
                                                                slidesPerView={1}
                                                                spaceBetween={30}
                                                                centeredSlides={false}
                                                                loop={true}
                                                                allowTouchMove={true}
                                                                observer={true}
                                                                pagination={{
                                                                    el: ".bd-post-slider-pagination",
                                                                    clickable: true,
                                                                }}
                                                                navigation={{
                                                                    nextEl: ".post-navigation-next",
                                                                    prevEl: ".post-navigation-prev",
                                                                }}
                                                            >
                                                                {/* Render slider items if blog.images exists */}
                                                                {blog.images?.map((img, i) => (
                                                                    <SwiperSlide key={i}>
                                                                        {img && <Image src={img} alt={`slide-${i}`} style={{ width: "100%", height: "auto" }} />}
                                                                    </SwiperSlide>
                                                                ))}
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* blog content */}
                                                <div className="bd-blog-content">
                                                    <div className="bd-blog-meta-list">
                                                        {blog.authorName && (
                                                            <div className="bd-blog-meta-item has-separator">
                                                                <span className="meta-icon"><i className="fa-solid fa-user"></i></span>
                                                                <span className="meta-text"><Link className="meta-author" href={`/blog/blog-details/${blog.id}`}>{blog.authorName}</Link></span>
                                                            </div>
                                                        )}
                                                        {blog.date && (
                                                            <div className="bd-blog-meta-item">
                                                                <span className="meta-icon"><i className="fa-sharp fa-light fa-calendar-days"></i></span>
                                                                <span className="meta-text">{blog.date}</span>
                                                            </div>
                                                        )}
                                                        {blog.comments !== undefined && (
                                                            <div className="bd-blog-meta-item">
                                                                <span className="meta-icon"><i className="fa-solid fa-comment-dots"></i></span>
                                                                <span className="meta-text">{blog.comments} {blog.comments > 1 ? "Comments" : "Comment"}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h3 className="bd-blog-title mb-15 underline">
                                                        {
                                                            blog.buttonLink == true ?
                                                                <Link href="/blog/blog-details">{blog.title}</Link>
                                                                :
                                                                <>
                                                                    {blog.daynamicLink == true &&
                                                                        <Link href={`/blog/blog-details/${blog.id}`}>{blog.title}</Link>
                                                                    }
                                                                </>
                                                        }
                                                    </h3>

                                                    <p>{blog.description}</p>

                                                    {
                                                        blog.daynamicLink == true &&
                                                        <div className="bd-blog-btn">
                                                            <Link href={`/blog/blog-details/${blog.id}`} className="bd-btn btn-outline-primary">Read More</Link>
                                                        </div>
                                                    }
                                                </div>
                                            </article>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* -- pagination style -- */}
                            <BasicPagination />
                            {/* -- pagination style end -- */}
                        </div>

                        <div className="col-xxl-4 col-xl-4 col-xxl-4 col-lg-4">
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </section>
            {/* -- blog area end -- */}
        </>
    );
};

export default BlogMain;
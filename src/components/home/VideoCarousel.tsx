// src/components/home/VideoCarousel.tsx
"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import '../../../styles/components/video-carousel.scss';



// VideoCarousel.tsx
// This component displays a carousel of featured video lessons for Android development.

const videoData = [
  {
    title: "Intro to Android Studio",
    thumbnail: "/assets/images/video-gallery/video1.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=MZFXBw-iT3Q",
  },
  {
    title: "Android Development Eco System",
    thumbnail: "/assets/images/video-gallery/video2.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=jnl_DlXG6Tk",
  },
  {
    title: "Android SDK Explained",
    thumbnail: "/assets/images/video-gallery/video3.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=rkGiHjjVVxw",
  },
  {
    title: "Android Packages explained", 
    thumbnail: "/assets/images/video-gallery/video4.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=rkJU_5xMzps",
  },
    {
    title: "Android Dev Tools & Workflows Explained", 
    thumbnail: "/assets/images/video-gallery/video5.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=JS3ysmYI2G4",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

const VideoCarousel = () => {
    
  return (
    <section className="video-carousel-area section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>🎬 Featured Video Lessons</h2>
          <p>Learn Android development through step-by-step video tutorials.</p>
        </div>

        <Slider {...settings}>
          {videoData.map((video, index) => (
            <div className="video-slide" key={index}>
              <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <div className="video-thumb">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={360}
                    height={202}
                    layout="responsive"
                  />
                </div>
                <h4 className="video-title">{video.title}</h4>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default VideoCarousel;

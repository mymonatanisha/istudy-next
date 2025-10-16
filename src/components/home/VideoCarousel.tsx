"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Helper to extract YouTube video ID for embed
function getYouTubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

const VideoCarousel = () => {
  const [modalVideo, setModalVideo] = useState<null | typeof videoData[0]>(null);

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
              <button
                type="button"
                className="video-thumb-btn"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%" }}
                onClick={() => setModalVideo(video)}
                aria-label={`Play ${video.title}`}
              >
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
              </button>
            </div>
          ))}
        </Slider>

        {/* Overlay Modal Popup */}
        {modalVideo && (
          <div
            className="video-modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.8)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => setModalVideo(null)}
          >
            <div
              className="video-modal-content"
              style={{
                position: "relative",
                background: "#000",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)"
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 20,
                  cursor: "pointer"
                }}
              >×</button>
              <iframe
                width="560"
                height="315"
                src={getYouTubeEmbedUrl(modalVideo.youtubeUrl)}
                title={modalVideo.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ borderRadius: "8px", maxWidth: "80vw", maxHeight: "80vh" }}
              />
              <h4 style={{ color: "#fff", marginTop: "12px", textAlign: "center" }}>{modalVideo.title}</h4>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoCarousel;
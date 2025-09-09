// components/home/ShortsCarousel.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const shortsData = [
  {
    id: "short1",
    title: "Why Use Android Studio?",
    thumbnail: "/assets/images/shorts/short1.webp",
    link: "https://www.youtube.com/shorts/ffyMzJJX7TU",
  },
  {
    id: "short2",
    title: "App UI in 60 Seconds",
    thumbnail: "/assets/images/shorts/short2.webp",
    link: "https://www.youtube.com/shorts/5i8BqyEzCHs",
  },
  {
    id: "short3",
    title: "Intro to Kotlin for Android",
    thumbnail: "/assets/images/shorts/short3.webp",
    link: "https://www.youtube.com/shorts/PdhuacMb50E",
  },
  {
    id: "short1",
    title: "Why Use Android Studio?",
    thumbnail: "/assets/images/shorts/short1.webp",
    link: "https://www.youtube.com/shorts/ffyMzJJX7TU",
  },
  {
    id: "short2",
    title: "App UI in 60 Seconds",
    thumbnail: "/assets/images/shorts/short2.webp",
    link: "https://www.youtube.com/shorts/5i8BqyEzCHs",
  },
  {
    id: "short3",
    title: "Intro to Kotlin for Android",
    thumbnail: "/assets/images/shorts/short3.webp",
    link: "https://www.youtube.com/shorts/PdhuacMb50E",
  },
  // Add more as needed
];

const ShortsCarousel = () => {
  return (
    <section className="shorts-carousel-area section-space">
      <div className="container">
        <h2 className="section-title">📱 EnamNotes Shorts</h2>
        <p className="section-subtitle">Quick coding tips & insights in under 60 seconds!</p>
        <div className="shorts-carousel-wrapper">
          {shortsData.map((short) => (
            <div className="shorts-card" key={short.id}>
              <Link href={short.link} target="_blank">
                <div className="shorts-thumb">
                  <Image
                    src={short.thumbnail}
                    alt={short.title}
                    width={180}
                    height={320}
                    className="shorts-img"
                  />
                </div>
                <h4 className="shorts-title">{short.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;

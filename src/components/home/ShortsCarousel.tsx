// components/home/ShortsCarousel.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const shortsData = [
  {
    id: "short1",
    title: "What Is Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short1.webp",
    link: "https://www.youtube.com/shorts/MLZrTzsIJ6I",
  },
  {
    id: "short2",
    title: "What Is an Activity in Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short2.webp",
    link: "https://www.youtube.com/shorts/XzyquUUDuPk",
  },
  {
    id: "short3",
    title: "Android Activity Lifecycle Explained with a Stage Actor | Basic Level",
    thumbnail: "/assets/images/shorts/short3.webp",
    link: "https://www.youtube.com/shorts/etbvw3wxhsU",
  },
  {
    id: "short4",
    title: "What is Context in Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short4.webp",
    link: "https://www.youtube.com/shorts/MhNPilKDFuw",
  },
  {
    id: "short5",
    title: "Android Dialog Boxes Explained | Basic Level",
    thumbnail: "/assets/images/shorts/short5.webp",
    link: "https://www.youtube.com/shorts/pecBBJ9BUAY",
  },
  {
    id: "short6",
    title: "What are Containers in Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short6.webp",
    link: "https://www.youtube.com/shorts/W3vQ_XnQ-6s",
  },
  {
    id: "short7",
    title: "What Is a Bundle in Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short7.webp",
    link: "https://www.youtube.com/shorts/ej7B6k5gSGE",
  },
  {
    id: "short8",
    title: "What Is an Intent in Android? | Basic Level",
    thumbnail: "/assets/images/shorts/short8.webp",
    link: "https://www.youtube.com/shorts/tSCVYNc6F2o",
  },
  {
    id: "short9",
    title: "What’s Inside the Java Folder in Android Studio? | Basic Level",
    thumbnail: "/assets/images/shorts/short9.webp",
    link: "https://www.youtube.com/shorts/Tp45-DI81Gc",
  },
  {
    id: "short10",
    title: "What’s Inside the res Folder in Android Studio? | Basic Level",
    thumbnail: "/assets/images/shorts/short10.webp",
    link: "https://www.youtube.com/shorts/54HtcLUcUuc",
  },
  {
    id: "short11",
    title: "What Is AndroidManifest.xml? | Basic Level",
    thumbnail: "/assets/images/shorts/short11.webp",
    link: "https://www.youtube.com/shorts/zVeyY9IF174",
  },
  {
    id: "short12",
    title: "Parcelable vs Serializable in Android? | Intermediate",
    thumbnail: "/assets/images/shorts/short12.webp",
    link: "https://www.youtube.com/shorts/8eE_eTbDApU",
  },
  {
    id: "short13",
    title: "What Are Broadcast Receivers in Android? | Intermediate",
    thumbnail: "/assets/images/shorts/short13.webp",
    link: "https://www.youtube.com/shorts/4pUyoNUvrwk",
  },
  {
    id: "short14",
    title: "What Are Script Files in Android Studio? | Intermediate",
    thumbnail: "/assets/images/shorts/short14.webp",
    link: "https://www.youtube.com/shorts/8D0bdqQrRJ8",
  },
  {
    id: "short15",
    title: "What Are Sensors in Android? | Intermediate",
    thumbnail: "/assets/images/shorts/short15.webp",
    link: "https://www.youtube.com/shorts/qUk2VzOliuA",
  },
  {
    id: "short16",
    title: "Main Thread vs Service in Android? | Intermediate",
    thumbnail: "/assets/images/shorts/short16.webp",
    link: "https://www.youtube.com/shorts/ShQxUbfZKDY",
  },
  {
    id: "short17",
    title: "What Is ADB in Android? | Advanced",
    thumbnail: "/assets/images/shorts/short17.webp",
    link: "https://www.youtube.com/shorts/pvba_LPArmc",
  },
  {
    id: "short18",
    title: "What Is AAPT in Android? | Advanced",
    thumbnail: "/assets/images/shorts/short18.webp",
    link: "https://www.youtube.com/shorts/SHmkVf9eMDM",
  },
  {
    id: "short19",
    title: "What is ART in Android? | Advanced",
    thumbnail: "/assets/images/shorts/short19.webp",
    link: "https://www.youtube.com/shorts/LB4jO-olBdY",
  },
  {
    id: "short20",
    title: "What Is Serializable in Android? | Advanced",
    thumbnail: "/assets/images/shorts/short20.webp",
    link: "https://www.youtube.com/shorts/HoSQpFawjtM",
  },
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

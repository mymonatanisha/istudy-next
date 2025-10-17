"use client";

import React, { useState } from "react";
import Image from "next/image";

const shortsData = [
  { id: "short1", title: "What Is Android? | Basic Level", thumbnail: "/assets/images/shorts/short1.webp", link: "https://www.youtube.com/shorts/MLZrTzsIJ6I" },
  { id: "short2", title: "What Is an Activity in Android? | Basic Level", thumbnail: "/assets/images/shorts/short2.webp", link: "https://www.youtube.com/shorts/XzyquUUDuPk" },
  { id: "short3", title: "Android Activity Lifecycle Explained with a Stage Actor | Basic Level", thumbnail: "/assets/images/shorts/short3.webp", link: "https://www.youtube.com/shorts/etbvw3wxhsU" },
  { id: "short4", title: "What is Context in Android? | Basic Level", thumbnail: "/assets/images/shorts/short4.webp", link: "https://www.youtube.com/shorts/MhNPilKDFuw" },
  { id: "short5", title: "Android Dialog Boxes Explained | Basic Level", thumbnail: "/assets/images/shorts/short5.webp", link: "https://www.youtube.com/shorts/pecBBJ9BUAY" },
  { id: "short6", title: "What are Containers in Android? | Basic Level", thumbnail: "/assets/images/shorts/short6.webp", link: "https://www.youtube.com/shorts/W3vQ_XnQ-6s" },
  { id: "short7", title: "What Is a Bundle in Android? | Basic Level", thumbnail: "/assets/images/shorts/short7.webp", link: "https://www.youtube.com/shorts/ej7B6k5gSGE" },
  { id: "short8", title: "What Is an Intent in Android? | Basic Level", thumbnail: "/assets/images/shorts/short8.webp", link: "https://www.youtube.com/shorts/tSCVYNc6F2o" },
  { id: "short9", title: "What’s Inside the Java Folder in Android Studio? | Basic Level", thumbnail: "/assets/images/shorts/short9.webp", link: "https://www.youtube.com/shorts/Tp45-DI81Gc" },
  { id: "short10", title: "What’s Inside the res Folder in Android Studio? | Basic Level", thumbnail: "/assets/images/shorts/short10.webp", link: "https://www.youtube.com/shorts/54HtcLUcUuc" },
  { id: "short11", title: "What Is AndroidManifest.xml? | Basic Level", thumbnail: "/assets/images/shorts/short11.webp", link: "https://www.youtube.com/shorts/zVeyY9IF174" },
  { id: "short12", title: "Parcelable vs Serializable in Android? | Intermediate", thumbnail: "/assets/images/shorts/short12.webp", link: "https://www.youtube.com/shorts/8eE_eTbDApU" },
  { id: "short13", title: "What Are Broadcast Receivers in Android? | Intermediate", thumbnail: "/assets/images/shorts/short13.webp", link: "https://www.youtube.com/shorts/4pUyoNUvrwk" },
  { id: "short14", title: "What Are Script Files in Android Studio? | Intermediate", thumbnail: "/assets/images/shorts/short14.webp", link: "https://www.youtube.com/shorts/8D0bdqQrRJ8" },
  { id: "short15", title: "What Are Sensors in Android? | Intermediate", thumbnail: "/assets/images/shorts/short15.webp", link: "https://www.youtube.com/shorts/qUk2VzOliuA" },
  { id: "short16", title: "Main Thread vs Service in Android? | Intermediate", thumbnail: "/assets/images/shorts/short16.webp", link: "https://www.youtube.com/shorts/ShQxUbfZKDY" },
  { id: "short17", title: "What Is ADB in Android? | Advanced", thumbnail: "/assets/images/shorts/short17.webp", link: "https://www.youtube.com/shorts/pvba_LPArmc" },
  { id: "short18", title: "What Is AAPT in Android? | Advanced", thumbnail: "/assets/images/shorts/short18.webp", link: "https://www.youtube.com/shorts/SHmkVf9eMDM" },
  { id: "short19", title: "What is ART in Android? | Advanced", thumbnail: "/assets/images/shorts/short19.webp", link: "https://www.youtube.com/shorts/LB4jO-olBdY" },
  { id: "short20", title: "What Is Serializable in Android? | Advanced", thumbnail: "/assets/images/shorts/short20.webp", link: "https://www.youtube.com/shorts/HoSQpFawjtM" },
];

function getYouTubeShortsEmbedUrl(url: string) {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

const ShortsCarousel = () => {
  const [modalShort, setModalShort] = useState<any>(null);

  return (
    <section className="shorts-carousel-area section-space">
      <div className="container">
        <h2 className="section-title">📱 EnamNotes Shorts</h2>
        <p className="section-subtitle">Quick coding tips & insights in under 60 seconds!</p>

        <div className="shorts-carousel-wrapper">
          {shortsData.map((short) => (
            <div
              className="shorts-card"
              key={short.id}
              onClick={() => setModalShort(short)}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              aria-label={`Play ${short.title}`}
            >
              <div className="shorts-thumb">
                <Image src={short.thumbnail} alt={short.title} width={180} height={320} className="shorts-img" />
              </div>
              <h4 className="shorts-title">{short.title}</h4>
            </div>
          ))}
        </div>

        {modalShort && (
          <div
            className="shorts-modal-overlay"
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setModalShort(null)}
          >
            <div
              className="shorts-modal-content"
              style={{ position: "relative", background: "#000", borderRadius: 8, padding: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.4)", maxWidth: 360, width: "95vw" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalShort(null)}
                aria-label="Close"
                style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 20, cursor: "pointer" }}
              >
                ×
              </button>

              <iframe
                width="320"
                height="560"
                src={getYouTubeShortsEmbedUrl(modalShort.link)}
                title={modalShort.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ borderRadius: 8, width: "100%", height: 360 }}
              />
              <h4 style={{ color: "#fff", marginTop: 12, textAlign: "center" }}>{modalShort.title}</h4>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShortsCarousel;
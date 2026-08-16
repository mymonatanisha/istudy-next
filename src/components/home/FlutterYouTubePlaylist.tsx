"use client";
import React from "react";

/**
 * Component for embedding and displaying the Flutter App Development YouTube playlist.
 * Displays a responsive YouTube playlist embed with a 16:9 aspect ratio.
 */

const FLUTTER_PLAYLIST_ID = "PLg_3d7KmjG4PSJPvVDIVUq3uhAU1yVMkP";

const FlutterYouTubePlaylist: React.FC = () => {
  return (
    <section className="youtube-playlist-area section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>
            <span aria-hidden="true">📚 </span>
            Flutter App Development Playlist
          </h2>
          <p>Watch the complete Flutter App Development learning playlist from our YouTube channel.</p>
        </div>

        <div className="playlist-wrapper">
          <div className="playlist-embed-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(FLUTTER_PLAYLIST_ID)}`}
              title="Flutter App Development — Beginner to Pro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlutterYouTubePlaylist;

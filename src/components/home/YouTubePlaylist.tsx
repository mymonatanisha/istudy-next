"use client";
import React from "react";

// YouTubePlaylist.tsx
// This component displays a YouTube playlist using the YouTube embed API.

interface YouTubePlaylistProps {
  playlistId: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ playlistId }) => {
  return (
    <section className="youtube-playlist-area section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>📚 Complete Video Course</h2>
          <p>Watch the full playlist of Android development tutorials.</p>
        </div>

        <div className="playlist-wrapper">
          <div className="playlist-container">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
              title="Android Development Course Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                border: "0",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlaylist;

"use client";
import React from "react";

// YouTubePlaylist.tsx
// This component displays a YouTube playlist below the Featured Video Lessons section.

interface YouTubePlaylistProps {
  playlistId?: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ 
  playlistId = "PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC" 
}) => {
  return (
    <section className="youtube-playlist-area section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>📚 Complete Course Playlist</h2>
          <p>Access all our Android development tutorials in one organized playlist.</p>
        </div>

        <div className="playlist-wrapper">
          <div className="playlist-embed-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
              title="YouTube Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlaylist;

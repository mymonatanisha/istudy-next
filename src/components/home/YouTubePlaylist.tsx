"use client";
import React from "react";

/**
 * Component for embedding and displaying a YouTube playlist.
 * Displays a responsive YouTube playlist embed with a 16:9 aspect ratio.
 */

interface YouTubePlaylistProps {
  playlistId?: string;
}

// Validate playlist ID: should be alphanumeric with underscores, hyphens, and expected length
const isValidPlaylistId = (id: string): boolean => {
  return /^[A-Za-z0-9_-]{10,50}$/.test(id);
};

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ 
  playlistId = "PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC" 
}) => {
  // Use validated playlist ID or fallback to default
  const validatedPlaylistId = isValidPlaylistId(playlistId) 
    ? playlistId 
    : "PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC";

  return (
    <section className="youtube-playlist-area section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>
            <span aria-hidden="true">📚 </span>
            Complete Course Playlist
          </h2>
          <p>Access all our Android development tutorials in one organized playlist.</p>
        </div>

        <div className="playlist-wrapper">
          <div className="playlist-embed-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(validatedPlaylistId)}`}
              title="Complete Android Development Course Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlaylist;

"use client";

import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import Image from "next/image";

export interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubePlaylistPlayerProps {
  playlistVideos: PlaylistVideo[];
  playlistId: string;
}

const YouTubePlaylistPlayer: React.FC<YouTubePlaylistPlayerProps> = ({
  playlistVideos,
  playlistId,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const thumbnailListRef = useRef<HTMLDivElement>(null);

  const filteredVideos = playlistVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // YouTube player event handlers
  const onReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    setIsPlayerReady(true);
    console.debug("YouTube player ready");
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const state = event.data;
    
    if (state === 1) {
      console.debug("Video playing:", playlistVideos[currentVideoIndex]?.title);
    } else if (state === 2) {
      console.debug("Video paused:", playlistVideos[currentVideoIndex]?.title);
    } else if (state === 0) {
      console.debug("Video ended:", playlistVideos[currentVideoIndex]?.title);
      // Auto-advance to next video
      handleNextVideo();
    }
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    if (player && isPlayerReady) {
      player.loadVideoById(playlistVideos[index].videoId);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < playlistVideos.length - 1) {
      const nextIndex = currentVideoIndex + 1;
      setCurrentVideoIndex(nextIndex);
      if (player && isPlayerReady) {
        player.loadVideoById(playlistVideos[nextIndex].videoId);
      }
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      setCurrentVideoIndex(prevIndex);
      if (player && isPlayerReady) {
        player.loadVideoById(playlistVideos[prevIndex].videoId);
      }
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  // Keyboard navigation for thumbnails
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleVideoSelect(index);
    }
  };

  return (
    <div className="youtube-playlist-player">
      <div className="playlist-grid">
        {/* Video Player Section */}
        <div className="player-section">
          <div className="player-wrapper">
            <YouTube
              videoId={playlistVideos[currentVideoIndex]?.videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
            />
          </div>
          <div className="current-video-info">
            <h3>{playlistVideos[currentVideoIndex]?.title}</h3>
            <div className="player-controls">
              <button
                onClick={handlePreviousVideo}
                disabled={currentVideoIndex === 0}
                aria-label="Previous video"
                className="control-btn"
              >
                <i className="fa-solid fa-backward"></i> Previous
              </button>
              <span className="video-counter">
                {currentVideoIndex + 1} / {playlistVideos.length}
              </span>
              <button
                onClick={handleNextVideo}
                disabled={currentVideoIndex === playlistVideos.length - 1}
                aria-label="Next video"
                className="control-btn"
              >
                Next <i className="fa-solid fa-forward"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail List Section */}
        <div className="thumbnail-list-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search videos in playlist"
              className="search-input"
            />
            <i className="fa-solid fa-search search-icon"></i>
          </div>
          
          <div className="thumbnail-list" ref={thumbnailListRef}>
            {filteredVideos.map((video, index) => {
              const actualIndex = playlistVideos.findIndex(
                (v) => v.videoId === video.videoId
              );
              const isActive = actualIndex === currentVideoIndex;
              
              return (
                <div
                  key={video.videoId}
                  className={`thumbnail-item ${isActive ? "active" : ""}`}
                  onClick={() => handleVideoSelect(actualIndex)}
                  onKeyDown={(e) => handleKeyDown(e, actualIndex)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Play ${video.title}`}
                  aria-pressed={isActive}
                >
                  <div className="thumbnail-image-wrapper">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={120}
                      height={90}
                      className="thumbnail-image"
                    />
                    {isActive && (
                      <div className="playing-indicator">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    )}
                  </div>
                  <div className="thumbnail-details">
                    <h4 className="thumbnail-title">{video.title}</h4>
                    <span className="video-number">
                      Video {actualIndex + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="no-results">
              <p>No videos found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubePlaylistPlayer;

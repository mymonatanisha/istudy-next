"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import type { PlaylistVideo } from "@/types/youtube";

interface YouTubePlaylistPlayerProps {
  playlistVideos: PlaylistVideo[];
}

export default function YouTubePlaylistPlayer({
  playlistVideos,
}: YouTubePlaylistPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");

  const currentVideo = playlistVideos[currentIndex];
  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return playlistVideos;
    return playlistVideos.filter((video) => video.title.toLowerCase().includes(query));
  }, [playlistVideos, search]);

  if (!currentVideo) return null;

  const selectVideo = (index: number) => setCurrentIndex(index);
  const previous = () => setCurrentIndex((index) => Math.max(0, index - 1));
  const next = () =>
    setCurrentIndex((index) => Math.min(playlistVideos.length - 1, index + 1));

  return (
    <div className="youtube-playlist-player">
      <div className="youtube-playlist-grid">
        <div className="youtube-playlist-main">
          <div className="youtube-player-frame">
            <iframe
              key={currentVideo.videoId}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(currentVideo.videoId)}?rel=0`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <h3>{currentVideo.title}</h3>

          <div className="youtube-playlist-controls">
            <button type="button" onClick={previous} disabled={currentIndex === 0}>
              ← Previous
            </button>
            <span>
              {currentIndex + 1} / {playlistVideos.length}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={currentIndex === playlistVideos.length - 1}
            >
              Next →
            </button>
          </div>
        </div>

        <aside className="youtube-playlist-sidebar" aria-label="Playlist videos">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search videos..."
            aria-label="Search playlist videos"
          />

          <div className="youtube-playlist-video-list">
            {filteredVideos.map((video) => {
              const index = playlistVideos.findIndex((item) => item.videoId === video.videoId);
              const active = index === currentIndex;

              return (
                <button
                  key={video.videoId}
                  type="button"
                  className={active ? "is-active" : ""}
                  onClick={() => selectVideo(index)}
                >
                  <Image
                    src={video.thumbnail}
                    alt=""
                    width={120}
                    height={68}
                  />
                  <span>
                    <strong>{video.title}</strong>
                    <small>Video {index + 1}</small>
                  </span>
                </button>
              );
            })}

            {!filteredVideos.length && <p>No videos found.</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

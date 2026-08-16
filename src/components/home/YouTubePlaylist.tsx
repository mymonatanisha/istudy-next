import React from "react";
import { getPlaylistItems } from "@/lib/getPlaylistItems";
import YouTubePlaylistPlayer from "./YouTubePlaylistPlayer";

interface YouTubePlaylistProps {
  playlistId?: string;
}

const DEFAULT_PLAYLIST_ID = "PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC";

const isValidPlaylistId = (id: string) => /^[A-Za-z0-9_-]{10,50}$/.test(id);

/**
 * Server component for the Android course playlist.
 * With YT_API_KEY configured it renders the enhanced playlist UI.
 * Without the key it safely falls back to YouTube's native playlist embed.
 */
const YouTubePlaylist = async ({ playlistId = DEFAULT_PLAYLIST_ID }: YouTubePlaylistProps) => {
  const validatedPlaylistId = isValidPlaylistId(playlistId)
    ? playlistId
    : DEFAULT_PLAYLIST_ID;

  const playlistVideos = await getPlaylistItems(validatedPlaylistId);

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

        {playlistVideos?.length ? (
          <YouTubePlaylistPlayer playlistVideos={playlistVideos} />
        ) : (
          <div className="playlist-wrapper">
            <div className="playlist-embed-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(validatedPlaylistId)}`}
                title="Complete Android Development Course Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="playlist-fallback-notice">
              Basic playlist mode is active. Add <code>YT_API_KEY</code> to the server environment
              to enable search, thumbnails, and next/previous controls.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default YouTubePlaylist;

import React from "react";
import { getPlaylistItems } from "@/lib/getPlaylistItems";
import YouTubePlaylistPlayer from "./YouTubePlaylistPlayer.client";

const PLAYLIST_ID = "PLg_3d7KmjG4MWxX0fZ9pMDFtXxOfG8uoC";

/**
 * Server component that fetches playlist data and renders the player
 * Falls back to iframe embed if API key is not available
 */
const YouTubePlaylistSection = async () => {
  // Attempt to fetch playlist items server-side
  const playlistVideos = await getPlaylistItems(PLAYLIST_ID);

  return (
    <section className="youtube-playlist-section section-space">
      <div className="container">
        <div className="section-title text-center mb-40">
          <h2>🎓 Complete Android Development Course</h2>
          <p>
            Master Android development from scratch with our comprehensive video playlist.
          </p>
        </div>

        {playlistVideos && playlistVideos.length > 0 ? (
          // Render client player with server-fetched data
          <YouTubePlaylistPlayer
            playlistVideos={playlistVideos}
            playlistId={PLAYLIST_ID}
          />
        ) : (
          // Fallback: iframe embed if API key not available
          <div className="playlist-fallback">
            <div className="iframe-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}`}
                title="Android Development Course Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="playlist-iframe"
              />
            </div>
            <p className="fallback-notice">
              <i className="fa-solid fa-info-circle"></i> 
              Viewing playlist in basic mode. For enhanced features, configure YouTube API key.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default YouTubePlaylistSection;

/**
 * Server-side helper to fetch YouTube playlist items using YouTube Data API v3
 * This runs only on the server and keeps the API key secure
 */

export interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

/**
 * Fetches playlist items from YouTube Data API v3
 * @param playlistId - The YouTube playlist ID
 * @returns Array of playlist videos or null if API key is not configured
 */
export async function getPlaylistItems(
  playlistId: string
): Promise<PlaylistVideo[] | null> {
  const apiKey = process.env.YT_API_KEY;

  // If no API key is configured, return null to trigger fallback
  if (!apiKey) {
    console.warn('YT_API_KEY not configured, using iframe fallback');
    return null;
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString(), {
      // Revalidate every 6 hours as per requirements
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      console.error(`YouTube API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error('Invalid response from YouTube API');
      return null;
    }

    // Map the response to our interface
    const videos: PlaylistVideo[] = data.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((item: any) => item.snippet?.resourceId?.videoId) // Filter out deleted videos
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
      }));

    return videos;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return null;
  }
}

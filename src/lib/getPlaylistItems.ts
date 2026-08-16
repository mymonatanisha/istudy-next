import { PlaylistVideo } from "@/types/youtube";

interface YouTubePlaylistResponse {
  nextPageToken?: string;
  items?: Array<{
    snippet?: {
      title?: string;
      publishedAt?: string;
      resourceId?: { videoId?: string };
      thumbnails?: {
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
}

/**
 * Fetch all videos from a YouTube playlist server-side.
 * The API key is never exposed to the browser.
 */
export async function getPlaylistItems(
  playlistId: string,
): Promise<PlaylistVideo[] | null> {
  const apiKey = process.env.YT_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  const videos: PlaylistVideo[] = [];
  let pageToken: string | undefined;

  try {
    do {
      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("key", apiKey);
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const response = await fetch(url.toString(), {
        next: { revalidate: 21600 },
      });

      if (!response.ok) {
        console.error(`YouTube API request failed: ${response.status}`);
        return null;
      }

      const data = (await response.json()) as YouTubePlaylistResponse;

      for (const item of data.items ?? []) {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId;
        const thumbnail =
          snippet?.thumbnails?.medium?.url ?? snippet?.thumbnails?.default?.url;

        if (!videoId || !snippet?.title || !thumbnail) continue;

        videos.push({
          videoId,
          title: snippet.title,
          thumbnail,
          publishedAt: snippet.publishedAt ?? "",
        });
      }

      pageToken = data.nextPageToken;
    } while (pageToken);

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    return null;
  }
}

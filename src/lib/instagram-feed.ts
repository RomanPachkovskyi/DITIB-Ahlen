export type InstagramItemType = "image" | "video" | "carousel";

export interface InstagramItem {
  id: string;
  type: InstagramItemType;
  imageUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
  likeCount: number | null;
  commentsCount: number | null;
}

export interface InstagramFeed {
  items: InstagramItem[];
  updatedAt: string | null;
  source: "live" | "cache" | "empty";
  error?: boolean;
}

const FEED_URL = "/api/instagram-feed.php";

export async function fetchInstagramFeed(signal?: AbortSignal): Promise<InstagramFeed> {
  const res = await fetch(FEED_URL, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`instagram-feed http ${res.status}`);
  }
  return (await res.json()) as InstagramFeed;
}

import crypto from "node:crypto";

export interface BlogImageStorageResult {
  url: string;
  publicId?: string;
}

function signUploadParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

/** Upload a Blog Admin image to Cloudinary using a server-side signed upload. */
export async function uploadBlogImage(file: File): Promise<BlogImageStorageResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary storage is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "enamnotes/blog";
  const signature = signUploadParams({ folder, timestamp }, apiSecret);

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp);
  body.append("folder", folder);
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });

  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    console.error("Cloudinary upload failed:", data);
    throw new Error(data.error?.message || "Image upload failed.");
  }

  return { url: data.secure_url, publicId: data.public_id };
}

/** Delete an image from Cloudinary by its public id. Safe no-op if unconfigured. */
export async function deleteBlogImage(publicId: string): Promise<void> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret || !publicId) {
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signUploadParams({ public_id: publicId, timestamp }, apiSecret);

  const body = new URLSearchParams({
    public_id: publicId,
    api_key: apiKey,
    timestamp,
    signature,
  });

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();
  if (!response.ok || data.result !== "ok") {
    console.error("Cloudinary delete failed:", data);
  }
}

/** Extract Cloudinary public ids embedded in blog content (data-cloudinary-public-id). */
export function extractBlogImagePublicIds(content: string): string[] {
  const ids: string[] = [];
  const pattern = /data-cloudinary-public-id="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

/**
 * Derive the Cloudinary public id from a secure_url like
 * https://res.cloudinary.com/<cloud>/image/upload/v123/enamnotes/blog/photo.jpg
 * Returns null when the URL is not a Cloudinary upload URL.
 */
export function publicIdFromCloudinaryUrl(url: string): string | null {
  const match = /\/image\/upload\/(?:v\d+\/)?(.+)$/.exec(url);
  if (!match) return null;
  // Strip the trailing format extension (public_id excludes it).
  return match[1].replace(/\.[a-zA-Z0-9]+$/, "");
}

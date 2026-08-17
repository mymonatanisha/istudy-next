export interface BlogImageStorageResult {
  url: string;
  publicId?: string;
}

/**
 * Uploads a blog image to Cloudinary using the server-side API.
 * This avoids Heroku's ephemeral filesystem and keeps the API secret off the client.
 */
export async function uploadBlogImage(file: File): Promise<BlogImageStorageResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary storage is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.");
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  body.append("folder", "enamnotes/blog");

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

"use client";

import { useRef, useState } from "react";

export interface BlogImageInsertProps {
  onInsert: (html: string) => void;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function BlogImageInsert({ onInsert }: BlogImageInsertProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{ url: string; publicId?: string } | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/blog-posts/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image upload failed.");

      const suggestedAlt = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();

      setUploadedImage({ url: data.url, publicId: data.publicId });
      setAltText(suggestedAlt);
      setCaption("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function insertImage() {
    if (!uploadedImage || !altText.trim()) {
      setError("Alt text is required for accessibility.");
      return;
    }

    const url = escapeHtml(uploadedImage.url);
    const alt = escapeHtml(altText.trim());
    const safeCaption = caption.trim() ? `<figcaption>${escapeHtml(caption.trim())}</figcaption>` : "";
    const publicId = uploadedImage.publicId
      ? ` data-cloudinary-public-id="${escapeHtml(uploadedImage.publicId)}"`
      : "";

    onInsert(
      `<figure><img src="${url}" alt="${alt}" loading="lazy"${publicId} />${safeCaption}</figure>`
    );

    setUploadedImage(null);
    setAltText("");
    setCaption("");
    setError("");
  }

  return (
    <div className="d-flex flex-wrap align-items-start gap-2">
      <div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading..." : "Insert Image"}
        </button>
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />

        {uploadedImage && (
          <div className="border rounded p-3 mt-2 bg-light" style={{ minWidth: 320, maxWidth: 520 }}>
            <img
              src={uploadedImage.url}
              alt="Uploaded preview"
              className="rounded mb-2"
              style={{ maxWidth: "100%", maxHeight: 220, objectFit: "contain" }}
            />
            <label className="form-label small" htmlFor="blog-image-alt">Alt text *</label>
            <input
              id="blog-image-alt"
              className="form-control form-control-sm mb-2"
              value={altText}
              onChange={(event) => setAltText(event.target.value)}
              placeholder="Describe the image"
              required
            />
            <label className="form-label small" htmlFor="blog-image-caption">Caption</label>
            <input
              id="blog-image-caption"
              className="form-control form-control-sm mb-2"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Optional caption"
            />
            <button type="button" className="btn btn-primary btn-sm" onClick={insertImage}>
              Insert into article
            </button>
          </div>
        )}

        {error && <div className="text-danger small mt-1">{error}</div>}
      </div>

      <div className="small text-muted border rounded px-3 py-2" style={{ maxWidth: 390 }}>
        <strong className="d-block mb-1 text-dark">Image guidelines</strong>
        <div>• <strong>Cover / Featured:</strong> 1200 × 630 px</div>
        <div>• <strong>Article / Content:</strong> 1200 × 675 px</div>
        <div>• <strong>Infographic:</strong> 1200 × 1600–2400 px</div>
        <div>• <strong>Format:</strong> WebP recommended (PNG/JPG also supported)</div>
        <div>• <strong>Max file size:</strong> 5 MB</div>
      </div>
    </div>
  );
}

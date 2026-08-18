"use client";

import { useRef, useState } from "react";

export interface BlogImageInsertProps {
  onInsert: (html: string) => void;
}

export default function BlogImageInsert({ onInsert }: BlogImageInsertProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/blog-posts/images", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image upload failed.");
      const alt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
      onInsert(`<figure><img src="${data.url}" alt="${alt}" loading="lazy" /><figcaption>${alt}</figcaption></figure>`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="d-flex flex-wrap align-items-start gap-2">
      <div>
        <button type="button" className="btn btn-outline-primary btn-sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Uploading..." : "Insert Image"}
        </button>
        <input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleChange} />
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

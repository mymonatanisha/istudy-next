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
    <span>
      <button type="button" className="btn btn-outline-primary btn-sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? "Uploading..." : "Insert Image"}
      </button>
      <input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleChange} />
      {error && <span className="text-danger small ms-2">{error}</span>}
    </span>
  );
}

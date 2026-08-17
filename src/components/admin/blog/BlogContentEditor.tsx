"use client";

import { useRef, useState } from "react";

interface BlogContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogContentEditor({ value, onChange }: BlogContentEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadImage = async (file: File) => {
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/blog-posts/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Upload failed.");

      const alt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
      const imageHtml = `<figure><img src="${data.url}" alt="${alt}" loading="lazy" /><figcaption>${alt}</figcaption></figure>`;
      onChange(value ? `${value}\n\n${imageHtml}` : imageHtml);
      setMessage("Image uploaded and inserted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-2">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Insert Image"}
        </button>
        <span className="text-muted small">JPG, PNG, WebP or GIF · max 5 MB</span>
        {message && <span className="small">{message}</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="d-none"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void uploadImage(file);
        }}
      />
      <textarea
        className="form-control"
        rows={20}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write HTML content here. Use Insert Image to upload and insert an image into the article."
      />
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

export default function ImageDropzone({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function uploadFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[#344059]">{label}</label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mt-1 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-6 text-center text-sm transition-colors ${
          dragOver ? "border-[#D89B2B] bg-[#fdf6e8]" : "border-[#e7dfce] bg-white"
        }`}
      >
        {value ? (
          <div className="mb-3 flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#f6f1e8]">
            <img src={value} alt="Cover preview" className="h-full w-full object-contain" />
          </div>
        ) : null}
        <p className="text-[#667085]">
          {uploading ? "Uploading..." : "Drag & drop an image here, or click to browse"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="...or paste an image URL"
        className="mt-2 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-1 text-xs uppercase tracking-wider text-[#667085] underline"
        >
          Remove image
        </button>
      )}
    </div>
  );
}

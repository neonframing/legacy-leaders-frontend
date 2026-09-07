"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageDropzone from "@/components/blog/ImageDropzone";

export default function PostForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverImageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCoverImageChange(url) {
    setForm((prev) => ({ ...prev, coverImageUrl: url }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push(`/blog/${data.post.slug}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Excerpt</label>
        <input
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="A short summary of your post"
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      <ImageDropzone label="Cover Image" value={form.coverImageUrl} onChange={handleCoverImageChange} />
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={12}
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">
          {error}{" "}
          {error.includes("profile") && (
            <a href="/blog/profile/edit" className="underline">
              Set up your profile
            </a>
          )}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B] disabled:opacity-50"
      >
        {submitting ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
}

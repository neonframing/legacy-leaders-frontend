"use client";

import { useState } from "react";
import Link from "next/link";

export default function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setComments((prev) => [...prev, data.comment]);
      setContent("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-[#344059]">Comments ({comments.length})</h3>

      <ul className="mt-4 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border border-[#e7dfce] bg-[#fffdf8] p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#667085]">
              <span className="font-semibold text-[#344059]">
                {comment.profiles?.display_name ?? "Unknown"}
              </span>
              <span>&middot;</span>
              <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-sm text-[#344059]">{comment.content}</p>
          </li>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-[#667085]">Be the first to comment.</p>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full border border-[#e7dfce] bg-white p-3 text-sm text-[#344059] focus:border-[#D89B2B] focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}{" "}
            {error.includes("profile") && (
              <Link href="/blog/profile/edit" className="underline">
                Set up your profile
              </Link>
            )}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-3 border border-[#D89B2B] bg-[#D89B2B] px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B] disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

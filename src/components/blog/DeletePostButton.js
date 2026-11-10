"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this post and all its comments?")) return;
    setBusy(true);
    const res = await fetch("/api/blog/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId }),
    });
    if (res.ok) {
      router.push("/blog");
      router.refresh();
    } else {
      setBusy(false);
      window.alert("Could not delete the post.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50"
    >
      {busy ? "Deleting..." : "Delete Post (Admin)"}
    </button>
  );
}

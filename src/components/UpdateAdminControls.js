"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UpdateForm({ audience }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, audience }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setForm({ title: "", content: "" });
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-[#e7dfce] bg-[#fffdf8] p-6">
      <h2 className="text-lg font-bold text-[#344059]">Post an update (admin)</h2>
      <input
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        required
        placeholder="Title"
        className="w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
      />
      <textarea
        value={form.content}
        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
        required
        rows={6}
        placeholder="Update details"
        className="w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B] disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post Update"}
      </button>
    </form>
  );
}

export function DeleteUpdateButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this update?")) return;
    setBusy(true);
    await fetch("/api/updates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="text-xs font-semibold uppercase tracking-wider text-red-600 hover:underline disabled:opacity-50"
    >
      Delete
    </button>
  );
}

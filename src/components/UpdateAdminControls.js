"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none";

export function UpdateForm({ audience }) {
  const router = useRouter();
  const [form, setForm] = useState({ kind: "update", title: "", content: "", eventDate: "" });
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
      setForm((p) => ({ ...p, title: "", content: "", eventDate: "" }));
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-[#e7dfce] bg-[#fffdf8] p-6">
      <h2 className="text-lg font-bold text-[#344059]">Add to this page (admin)</h2>
      <div className="flex gap-4">
        <select
          value={form.kind}
          onChange={(e) => setForm((p) => ({ ...p, kind: e.target.value }))}
          className={inputClass}
        >
          <option value="update">Update</option>
          <option value="itinerary">Itinerary item</option>
        </select>
        {form.kind === "itinerary" && (
          <input
            type="date"
            required
            value={form.eventDate}
            onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))}
            className={inputClass}
          />
        )}
      </div>
      <input
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        required
        placeholder="Title"
        className={inputClass}
      />
      <textarea
        value={form.content}
        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
        required
        rows={6}
        placeholder="Details (time, location, notes...)"
        className={inputClass}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B] disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export function DeleteUpdateButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this item?")) return;
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

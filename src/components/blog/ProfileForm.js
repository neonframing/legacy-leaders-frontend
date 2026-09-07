"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const socialFields = ["instagram", "linkedin", "x", "website"];

export default function ProfileForm({ initialProfile }) {
  const router = useRouter();
  const [form, setForm] = useState({
    username: initialProfile?.username ?? "",
    displayName: initialProfile?.display_name ?? "",
    role: initialProfile?.role ?? "fellow",
    bio: initialProfile?.bio ?? "",
    avatarUrl: initialProfile?.avatar_url ?? "",
    socials: {
      instagram: initialProfile?.socials?.instagram ?? "",
      linkedin: initialProfile?.socials?.linkedin ?? "",
      x: initialProfile?.socials?.x ?? "",
      website: initialProfile?.socials?.website ?? "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSocialChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, socials: { ...prev.socials, [name]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/blog/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push(`/blog/profile/${data.profile.username}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          pattern="[a-z0-9-]+"
          title="Lowercase letters, numbers, and hyphens only"
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Display Name</label>
        <input
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#344059]">I am a...</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        >
          <option value="fellow">Fellow</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Avatar URL</label>
        <input
          name="avatarUrl"
          value={form.avatarUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#344059]">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {socialFields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold capitalize text-[#344059]">{field}</label>
            <input
              name={field}
              value={form.socials[field]}
              onChange={handleSocialChange}
              placeholder="https://..."
              className="mt-1 w-full border border-[#e7dfce] bg-white p-3 text-sm focus:border-[#D89B2B] focus:outline-none"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B] disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

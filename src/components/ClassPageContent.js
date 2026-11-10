"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { UpdateForm, DeleteUpdateButton } from "@/components/UpdateAdminControls";

const ITINERARY_PAGE = 6;
const UPDATES_PAGE = 5;

// Fixed locale and UTC so server and client render identical text.
const fmt = (opts) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts });
const parseDay = (s) => new Date(`${s}T00:00:00Z`);

function ExpandableText({ text, lines = 3 }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 160 || text.split("\n").length > lines;
  const clamp = lines === 2 ? "line-clamp-2" : "line-clamp-3";
  return (
    <div>
      <p className={`whitespace-pre-wrap text-sm leading-relaxed ${open ? "" : clamp}`}>{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#D89B2B] hover:underline"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function ItineraryItem({ item, isAdmin, muted }) {
  const d = parseDay(item.event_date);
  return (
    <article className={`flex gap-4 border border-[#e7dfce] bg-[#fffdf8] p-4 ${muted ? "opacity-70" : ""}`}>
      <div className="flex h-16 w-14 flex-shrink-0 flex-col items-center justify-center bg-[#344059] text-white">
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          {fmt({ month: "short" }).format(d)}
        </span>
        <span className="text-2xl font-black leading-none">{fmt({ day: "numeric" }).format(d)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="break-words font-bold leading-snug">{item.title}</h3>
          {isAdmin && <DeleteUpdateButton id={item.id} />}
        </div>
        <p className="text-xs uppercase tracking-wider text-[#667085]">
          {fmt({ weekday: "long" }).format(d)}
        </p>
        <div className="mt-2">
          <ExpandableText text={item.content} lines={2} />
        </div>
      </div>
    </article>
  );
}

function UpdateItem({ item, isAdmin }) {
  return (
    <article className="border border-[#e7dfce] bg-[#fffdf8] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="break-words text-lg font-bold leading-snug sm:text-xl">{item.title}</h3>
        {isAdmin && <DeleteUpdateButton id={item.id} />}
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-[#667085]">
        {fmt({ month: "short", day: "numeric", year: "numeric" }).format(new Date(item.created_at))}
      </p>
      <div className="mt-3">
        <ExpandableText text={item.content} />
      </div>
    </article>
  );
}

export default function ClassPageContent({ audience, items, isAdmin, today }) {
  const [tab, setTab] = useState("itinerary");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [itineraryLimit, setItineraryLimit] = useState(ITINERARY_PAGE);
  const [updatesLimit, setUpdatesLimit] = useState(UPDATES_PAGE);

  const { upcoming, past, updates } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (i) => !q || `${i.title} ${i.content}`.toLowerCase().includes(q);
    const events = items.filter((i) => i.kind === "itinerary" && match(i));
    return {
      upcoming: events.filter((i) => i.event_date >= today).sort((a, b) => a.event_date.localeCompare(b.event_date)),
      past: events.filter((i) => i.event_date < today).sort((a, b) => b.event_date.localeCompare(a.event_date)),
      updates: items.filter((i) => i.kind !== "itinerary" && match(i)),
    };
  }, [items, query, today]);

  const visibleUpcoming = upcoming.slice(0, itineraryLimit);
  const months = [];
  for (const item of visibleUpcoming) {
    const key = item.event_date.slice(0, 7);
    const last = months[months.length - 1];
    if (last?.key === key) last.items.push(item);
    else months.push({ key, items: [item] });
  }

  const tabClass = (name) =>
    `flex-1 border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
      tab === name ? "border-[#D89B2B] text-[#344059]" : "border-transparent text-[#667085]"
    }`;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setItineraryLimit(ITINERARY_PAGE);
              setUpdatesLimit(UPDATES_PAGE);
            }}
            placeholder="Search itinerary and updates"
            className="w-full border border-[#e7dfce] bg-white py-3 pl-9 pr-3 text-sm focus:border-[#D89B2B] focus:outline-none"
          />
        </label>
        {isAdmin && (
          <button
            type="button"
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center justify-center gap-2 border border-[#D89B2B] bg-[#D89B2B] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B]"
          >
            <Plus size={16} /> {showForm ? "Close" : "Add New"}
          </button>
        )}
      </div>

      {isAdmin && showForm && (
        <div className="mt-4">
          <UpdateForm audience={audience} />
        </div>
      )}

      {/* Tabs on small screens; both columns side by side on large screens */}
      <div className="mt-6 flex border-b border-[#e7dfce] lg:hidden">
        <button type="button" onClick={() => setTab("itinerary")} className={tabClass("itinerary")}>
          Itinerary ({upcoming.length})
        </button>
        <button type="button" onClick={() => setTab("updates")} className={tabClass("updates")}>
          Updates ({updates.length})
        </button>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-5">
        <section
          className={`${tab === "itinerary" ? "block" : "hidden"} lg:col-span-2 lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-2`}
        >
          <h2 className="mb-4 hidden text-2xl font-black uppercase tracking-tight lg:block">Itinerary</h2>
          {months.map((m) => (
            <div key={m.key} className="mb-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">
                {fmt({ month: "long", year: "numeric" }).format(parseDay(`${m.key}-01`))}
              </h3>
              <div className="space-y-3">
                {m.items.map((i) => (
                  <ItineraryItem key={i.id} item={i} isAdmin={isAdmin} />
                ))}
              </div>
            </div>
          ))}
          {upcoming.length === 0 && <p className="text-[#667085]">No upcoming itinerary items.</p>}
          {upcoming.length > itineraryLimit && (
            <button
              type="button"
              onClick={() => setItineraryLimit((n) => n + ITINERARY_PAGE)}
              className="w-full border border-[#344059] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#344059] transition-all hover:bg-[#344059] hover:text-white"
            >
              Show more ({upcoming.length - itineraryLimit} left)
            </button>
          )}
          {past.length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowPast((s) => !s)}
                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-[#667085]"
              >
                Past events ({past.length})
                <ChevronDown size={16} className={`transition-transform ${showPast ? "rotate-180" : ""}`} />
              </button>
              {showPast && (
                <div className="mt-3 space-y-3">
                  {past.map((i) => (
                    <ItineraryItem key={i.id} item={i} isAdmin={isAdmin} muted />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section className={`${tab === "updates" ? "block" : "hidden"} lg:col-span-3 lg:block`}>
          <h2 className="mb-4 hidden text-2xl font-black uppercase tracking-tight lg:block">Updates</h2>
          <div className="space-y-4">
            {updates.slice(0, updatesLimit).map((u) => (
              <UpdateItem key={u.id} item={u} isAdmin={isAdmin} />
            ))}
            {updates.length === 0 && <p className="text-[#667085]">No updates found.</p>}
          </div>
          {updates.length > updatesLimit && (
            <button
              type="button"
              onClick={() => setUpdatesLimit((n) => n + UPDATES_PAGE)}
              className="mt-4 w-full border border-[#344059] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#344059] transition-all hover:bg-[#344059] hover:text-white"
            >
              Load more ({updates.length - updatesLimit} left)
            </button>
          )}
        </section>
      </div>
    </>
  );
}

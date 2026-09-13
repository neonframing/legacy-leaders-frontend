"use client";

import { Calendar as CalendarIcon, ExternalLink } from "lucide-react";

export default function GoogleCalendar({
  calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "",
  customEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL || "",
  timeZone = "America/Chicago",
  title = "Upcoming Events & Schedule",
  description = "Stay connected with fellowship sessions, mentor meetups, community service projects, and special events.",
}) {
  // If a full custom embed URL is supplied, use it; otherwise construct one from calendarId
  let embedUrl = customEmbedUrl;
  
  if (!embedUrl) {
    if (calendarId) {
      const encodedId = encodeURIComponent(calendarId);
      const encodedTz = encodeURIComponent(timeZone);
      embedUrl = `https://calendar.google.com/calendar/embed?src=${encodedId}&ctz=${encodedTz}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23ffffff`;
    } else {
      // Fallback preview URL when calendar ID is not yet configured
      const encodedTz = encodeURIComponent(timeZone);
      embedUrl = `https://calendar.google.com/calendar/embed?ctz=${encodedTz}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23ffffff`;
    }
  }

  const directCalendarUrl = calendarId
    ? `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`
    : "https://calendar.google.com";

  return (
    <div className="w-full">
      {/* Calendar Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#D89B2B]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">
              Community Calendar
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base text-gray-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <a
          href={directCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start sm:self-auto border border-[#344059] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#344059] transition-all hover:bg-[#344059] hover:text-white rounded-sm group"
        >
          <CalendarIcon size={14} className="text-[#D89B2B] group-hover:text-white transition-colors" />
          <span>Open Calendar</span>
          <ExternalLink size={12} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Calendar Embed Frame */}
      <div className="relative overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="aspect-[4/3] sm:aspect-[16/10] md:h-[620px] w-full">
          <iframe
            src={embedUrl}
            style={{ borderWidth: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            title="Legacy Leaders Calendar"
            className="w-full h-full min-h-[480px]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

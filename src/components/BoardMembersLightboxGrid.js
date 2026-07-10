"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";

export default function BoardMembersLightboxGrid({ boardMembers = [] }) {
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeMember]);

  return (
    <>
      <div className="mb-24 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
        {boardMembers.map((member) => (
          <article
            key={member._id}
            className="group flex cursor-pointer flex-col"
            onClick={() => setActiveMember(member)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveMember(member);
              }
            }}
          >
            <div className="relative mb-6 overflow-hidden bg-[#e8ebf1] rounded-none">
              <div className="relative aspect-[3/4] w-full">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                ) : null}
              </div>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059]">{member.name}</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">{member.role}</p>
            <p className="mt-2 text-sm leading-7 text-gray-500">{member.company}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#344059] group-hover:text-[#D89B2B] transition-colors">
              Read Bio <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </p>
          </article>
        ))}
      </div>

      {activeMember ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
          <div
            className="absolute inset-0 bg-[#344059]/90 backdrop-blur-sm"
            onClick={() => setActiveMember(null)}
          />

          <div className="relative z-10 max-h-[95vh] w-full max-w-5xl overflow-y-auto bg-white shadow-2xl">
            <button
              onClick={() => setActiveMember(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#344059] transition-colors hover:bg-[#D89B2B] hover:text-white"
              aria-label="Close bio modal"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative aspect-[3/4] bg-[#e8ebf1] md:min-h-[20rem] md:aspect-auto">
                {activeMember.imageUrl ? (
                  <Image
                    src={activeMember.imageUrl}
                    alt={activeMember.name}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="p-8 sm:p-10 md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">Board Member</p>
                <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#344059]">{activeMember.name}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#344059]/70">{activeMember.role}</p>
                <p className="mt-2 text-sm leading-7 text-gray-500">{activeMember.company}</p>

                <div className="mt-8 border-t border-[#344059]/10 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#344059] mb-3">Bio</p>
                  <p className="text-sm leading-7 text-gray-600 whitespace-pre-wrap">
                    {activeMember.bio || "Bio coming soon."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

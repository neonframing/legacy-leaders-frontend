"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe2, Handshake, X } from "lucide-react";

// Mock data for the sub-boards (replace with real data or Sanity queries later)
const advisoryMembers = [
  { name: "Marcus Thorne", role: "Corporate Strategy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Elena Rostova", role: "Philanthropy Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "David Chen", role: "Legal Counsel", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
];

const ypbMembers = [
  { name: "Sarah Jenkins", role: "Alumni Relations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Jameson Locke", role: "Events Chair", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
  { name: "Aisha Patel", role: "Community Outreach", image: "https://images.unsplash.com/photo-1531123897727-8f129e1b4dce?auto=format&fit=crop&w=800&q=80" },
];

export default function InteractiveBoardCards({ applicationLink }) {
  const [activeModal, setActiveModal] = useState(null); // 'advisory' | 'ypb' | null

  const activeData = activeModal === 'advisory' ? advisoryMembers : ypbMembers;
  const activeTitle = activeModal === 'advisory' ? "Legacy Advisory Board" : "Young Professionals Board";

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Advisory Board Card */}
        <div 
          onClick={() => setActiveModal('advisory')}
          className="group cursor-pointer rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10 transition-all hover:bg-[#344059] hover:text-white"
        >
          <Globe2 className="h-8 w-8 text-[#D89B2B] transition-transform group-hover:scale-110" />
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059] group-hover:text-white">Legacy Advisory Board</p>
          <p className="mt-4 text-base leading-8 text-gray-600 group-hover:text-gray-300">
            The Advisory Board is made up of experienced professionals, business leaders, and community advocates who provide specialized expertise, industry insight, and strategic counsel.
          </p>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B]">
            View Members &nbsp;→
          </p>
        </div>

        {/* YPB Card */}
        <div 
          onClick={() => setActiveModal('ypb')}
          className="group cursor-pointer rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10 transition-all hover:bg-[#344059] hover:text-white"
        >
          <Handshake className="h-8 w-8 text-[#D89B2B] transition-transform group-hover:scale-110" />
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059] group-hover:text-white">Young Professionals Board</p>
          <p className="mt-4 text-base leading-8 text-gray-600 group-hover:text-gray-300">
            Made up of Legacy Leaders alumni who give back by supporting events, recruiting future fellows, fundraising, and bringing valuable insight into how the organization can continue to grow.
          </p>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B]">
            View Members &nbsp;→
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#344059]/95 p-6 backdrop-blur-md transition-opacity">
          <button 
            onClick={() => setActiveModal(null)}
            className="absolute right-6 top-6 sm:right-12 sm:top-12 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-7xl">
            <h3 className="mb-12 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl text-center">
              {activeTitle}
            </h3>
            
            {/* Horizontal Scroll Carousel for Modal */}
            <div className="flex w-full snap-x snap-mandatory overflow-x-auto pb-8 gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {activeData.map((member, idx) => (
                <div key={idx} className="w-[85vw] sm:w-[350px] shrink-0 snap-center flex flex-col">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    />
                  </div>
                  <div className="mt-6 border-l-2 border-[#D89B2B] pl-4">
                    <p className="text-xl font-black uppercase tracking-tight text-white">{member.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a
                href={applicationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#D89B2B]"
              >
                Apply to join this board &nbsp;→
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
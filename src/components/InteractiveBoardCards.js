"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe2, Handshake, Target, X, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data for the sub-boards (replace with real data or Sanity queries later)
const advisoryMembers = [
  { name: "Marcus Thorne", role: "Corporate Strategy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Elena Rostova", role: "Philanthropy Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "David Chen", role: "Legal Counsel", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  { name: "Sophia Carter", role: "Finance Executive", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
  { name: "Jackson Wright", role: "Technology Officer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
];

const ypbMembers = [
  { name: "Sarah Jenkins", role: "Alumni Relations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Jameson Locke", role: "Events Chair", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
  { name: "Aisha Patel", role: "Community Outreach", image: "https://images.unsplash.com/photo-1531123897727-8f129e1b4dce?auto=format&fit=crop&w=800&q=80" },
  { name: "William Harris", role: "Marketing Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" },
];

const fundraisingMembers = [
  { name: "Maya Brooks", role: "Board Chair", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" },
  { name: "Derrick Collins", role: "Corporate Partnerships", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  { name: "Lauren Kim", role: "Donor Engagement", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
  { name: "Noah Price", role: "Events & Campaigns", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80" },
];

const boardModalContent = {
  advisory: {
    members: advisoryMembers,
    title: "Advisory Board",
    label: "Legacy Leaders",
    flyerSrc: "/AdvisoryBoardPage.png",
    flyerAlt: "Legacy Advisory Board flyer",
    flyerAspectRatio: "1101 / 1332",
  },
  ypb: {
    members: ypbMembers,
    title: "Young Professionals Board",
    label: "Alumni Network",
    flyerSrc: "/YoungProfessionals.PNG",
    flyerAlt: "Young Professionals Board flyer",
    flyerAspectRatio: "1024 / 1433",
  },
  fundraising: {
    members: fundraisingMembers,
    title: "Fundraising Board",
    label: "Legacy Leaders",
    flyerSrc: "/FundraisingCommitteePage.png",
    flyerAlt: "Fundraising Board flyer",
    flyerAspectRatio: "1024 / 1360",
  },
};

export default function InteractiveBoardCards({ applicationLink }) {
  const [activeModal, setActiveModal] = useState(null); // 'advisory' | 'ypb' | 'fundraising' | null

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  const activeContent = activeModal ? boardModalContent[activeModal] : null;
  const activeData = activeContent?.members || [];
  const activeTitle = activeContent?.title || "";
  const activeLabel = activeContent?.label || "";
  const activeFlyerSrc = activeContent?.flyerSrc || "";
  const activeFlyerAlt = activeContent?.flyerAlt || "";
  const activeFlyerAspectRatio = activeContent?.flyerAspectRatio || "8.5 / 11";
  const applyHref = applicationLink || "/join-board-application";

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Advisory Board Card */}
        <div 
          onClick={() => setActiveModal('advisory')}
          className="group cursor-pointer rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10 transition-all hover:bg-[#344059] hover:shadow-xl flex flex-col"
        >
          <div className="flex-1">
            <Globe2 className="h-8 w-8 text-[#D89B2B] transition-transform group-hover:scale-110" />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059] group-hover:text-white transition-colors">Legacy Advisory Board</p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">
              The Advisory Board is made up of experienced professionals, business leaders, and community advocates who provide specialized expertise, industry insight, and strategic counsel.
            </p>
          </div>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B]">
            Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </p>
        </div>

        {/* YPB Card */}
        <div 
          onClick={() => setActiveModal('ypb')}
          className="group cursor-pointer rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10 transition-all hover:bg-[#344059] hover:shadow-xl flex flex-col"
        >
          <div className="flex-1">
            <Handshake className="h-8 w-8 text-[#D89B2B] transition-transform group-hover:scale-110" />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059] group-hover:text-white transition-colors">Young Professionals Board</p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">
              Made up of Legacy Leaders alumni who give back by supporting events, recruiting future fellows, fundraising, and bringing valuable insight into how the organization can continue to grow.
            </p>
          </div>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B]">
            Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </p>
        </div>

        {/* Fundraising Board Card */}
        <div
          onClick={() => setActiveModal('fundraising')}
          className="group cursor-pointer rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10 transition-all hover:bg-[#344059] hover:shadow-xl flex flex-col"
        >
          <div className="flex-1">
            <Target className="h-8 w-8 text-[#D89B2B] transition-transform group-hover:scale-110" />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059] group-hover:text-white transition-colors">Fundraising Board</p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">
              The Fundraising Board helps advance Legacy Leaders' mission by building relationships, identifying fundraising opportunities, and engaging supporters who believe in developing the next generation of leaders. Members serve as ambassadors for the organization, helping ensure the resources needed to create lasting impact in our communities.
            </p>
          </div>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B]">
            Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </p>
        </div>
      </div>

      {/* --- MODAL LIGHTBOX --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#344059]/90 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-[#f8f6f1] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#344059]/10 bg-white p-6 sm:px-10 sm:py-8 shrink-0">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B] mb-2">{activeLabel}</p>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#344059]">{activeTitle}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#344059] transition-colors hover:bg-[#D89B2B] hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable Grid) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="mb-12">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#D89B2B]">Board Flyer</p>
                <div
                  className="relative w-full overflow-hidden border border-[#344059]/10 bg-white"
                  style={{ aspectRatio: activeFlyerAspectRatio }}
                >
                  <Image
                    src={activeFlyerSrc}
                    alt={activeFlyerAlt}
                    fill
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#D89B2B]">Board Members</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {activeData.map((person, idx) => (
                  <div key={idx} className="group flex flex-col">
                    <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden bg-gray-200">
                      {person.image && (
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      )}
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-[#344059]">{person.name}</h4>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#D89B2B]">{person.role}</p>
                  </div>
                ))}
              </div>
              
              {/* Application Link Footer inside the scrolling area */}
              <div className="mt-16 border-t border-[#344059]/10 pt-10 text-center">
                <Link
                  href={applyHref}
                  onClick={() => setActiveModal(null)}
                  className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#344059] transition-colors hover:text-[#D89B2B] group"
                >
                  Apply to join this board <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
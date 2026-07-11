"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe2, Handshake, Target, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const boardModalContent = {
  advisory: {
    title: "Advisory Board",
    label: "Legacy Leaders",
    flyerSrc: "/AdvisoryBoardPage.webp",
    flyerAlt: "Legacy Advisory Board flyer",
    flyerAspectRatio: "1101 / 1332",
  },
  ypb: {
    title: "Young Professionals Board",
    label: "Alumni Network",
    flyerSrc: "/YoungProfessionals.webp",
    flyerAlt: "Young Professionals Board flyer",
    flyerAspectRatio: "1024 / 1433",
  },
  fundraising: {
    title: "Fundraising Board",
    label: "Legacy Leaders",
    flyerSrc: "/FundraisingCommitteePage.webp",
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
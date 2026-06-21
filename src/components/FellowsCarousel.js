"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function FellowsCarousel({ fellows }) {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Manual scroll for the PC arrow buttons
  const manualScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 474 : 350; // Card width + gap
      carouselRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

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

  // Continuous slow scroll effect
  useEffect(() => {
    // Kill auto-scroll if hovered, touched, or if the modal is open
    if (isHovered || activeModal) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, activeModal]);

  return (
    <>
      <div 
        className="relative w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <button 
          onClick={() => manualScroll("left")}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-[#344059] shadow-lg transition-transform hover:scale-110 hover:border-[#D89B2B] hover:text-[#D89B2B] md:flex opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>
        
        <button 
          onClick={() => manualScroll("right")}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-[#344059] shadow-lg transition-transform hover:scale-110 hover:border-[#D89B2B] hover:text-[#D89B2B] md:flex opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>

        <div 
          ref={carouselRef}
          className="flex w-full overflow-x-auto px-6 lg:px-12 pb-12 gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {fellows.map((fellow) => (
            <article 
              key={fellow.label}
              onClick={() => setActiveModal(fellow)}
              className="w-[85vw] sm:w-[450px] shrink-0 overflow-hidden rounded-none border border-[#344059]/10 bg-white shadow-sm transition-all hover:shadow-xl flex flex-col cursor-pointer group/card"
            >
              <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={fellow.image}
                  alt={`${fellow.label} fellows`}
                  fill
                  sizes="(min-width: 768px) 450px, 85vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-[#344059]/0 transition-colors duration-300 group-hover/card:bg-[#344059]/20" />
              </div>
              <div className="space-y-2 p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold uppercase tracking-[0.22em] text-[#D89B2B]">{fellow.label}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#344059] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                    View Class
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059]">{fellow.title}</h3>
                <p className="text-base leading-relaxed text-gray-600 flex-1">{fellow.description}</p>
              </div>
            </article>
          ))}
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
          {/* Added strict max-h-[90vh] to force it to stay on screen */}
          <div className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-[#f8f6f1] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#344059]/10 bg-white p-6 sm:px-10 sm:py-8 shrink-0">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B] mb-2">Class of {activeModal.label}</p>
                <h3 className="text-3xl font-black uppercase tracking-tight text-[#344059]">{activeModal.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#344059] transition-colors hover:bg-[#D89B2B] hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable Fellows Grid) */}
            {/* Added flex-1 to force this div to consume remaining space and trigger the scrollbar */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {activeModal.individuals?.map((person, idx) => (
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
            </div>

          </div>
        </div>
      )}
    </>
  );
}
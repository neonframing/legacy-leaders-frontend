"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FellowsCarousel({ fellows }) {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Continuous slow scroll effect
  useEffect(() => {
    // If the user is hovering or touching, kill the auto-scroll
    if (isHovered) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    // A high-frequency interval to nudge the scrollbar 1 pixel at a time
    const interval = setInterval(() => {
      // Check if we've hit the very end of the scrollable area
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
        // Smoothly loop back to the beginning
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Nudge right by 1 pixel (behavior: "auto" keeps it from lagging)
        carousel.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 20); // ~50 frames per second for a buttery smooth glide

    // Cleanup the interval when the component unmounts or hover state changes
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* PC Navigation Arrows */}
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

      {/* Carousel Track 
        Notice that snap-x and snap-mandatory have been removed so it glides smoothly 
      */}
      <div 
        ref={carouselRef}
        className="flex w-full overflow-x-auto px-6 lg:px-12 pb-12 gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {fellows.map((fellow) => (
          <article 
            key={fellow.label} 
            className="w-[85vw] sm:w-[450px] shrink-0 overflow-hidden rounded-none border border-[#344059]/10 bg-white shadow-sm transition-all hover:shadow-xl flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full bg-gray-100">
              <Image
                src={fellow.image}
                alt={`${fellow.year} fellows`}
                fill
                sizes="(min-width: 768px) 450px, 85vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-3 p-8 flex-1 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D89B2B]">{fellow.label}</p>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059]">{fellow.year}</h3>
              <p className="text-base font-bold text-[#344059]">{fellow.title}</p>
              <p className="text-base leading-relaxed text-gray-600 flex-1">{fellow.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
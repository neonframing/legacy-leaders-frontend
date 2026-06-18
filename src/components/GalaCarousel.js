"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function GalaCarousel({ editions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextEdition = () => {
    setActiveIndex((prev) => (prev === editions.length - 1 ? 0 : prev + 1));
  };

  const prevEdition = () => {
    setActiveIndex((prev) => (prev === 0 ? editions.length - 1 : prev - 1));
  };

  // Auto-cycle logic
  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        nextEdition();
      }, 5000); // Swaps every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  const activeEdition = editions[activeIndex];

  return (
    <div 
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/20 pb-6">
        <div className="flex items-center gap-6">
          <h3 className="text-4xl font-black uppercase tracking-tight text-white transition-all">
            {activeEdition.year} Edition
          </h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevEdition}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#344059]"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextEdition}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#344059]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        <Link 
          href="/gallery" 
          className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#D89B2B] transition-colors hover:text-white"
        >
          View Full Media Gallery 
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* This relative wrapper ensures all grids stack perfectly.
        The opacity transitions create a cinematic crossfade instead of a jarring jump.
      */}
      <div className="relative w-full">
        {editions.map((edition, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <div 
              key={edition.year} 
              className={`grid gap-6 md:grid-cols-12 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 relative z-10" : "opacity-0 absolute inset-0 z-0 pointer-events-none"
              }`}
            >
              <div className="relative aspect-square md:aspect-auto md:col-span-8 overflow-hidden bg-gray-800">
                <Image
                  src={edition.images[0].src}
                  alt={edition.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-[10000ms] ease-linear hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 max-w-md bg-[#344059]/95 p-6 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D89B2B]">
                    {edition.images[0].label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {edition.images[0].caption}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 md:col-span-4">
                {edition.images.slice(1).map((img, imgIdx) => (
                  <div key={imgIdx} className="relative aspect-[4/3] w-full overflow-hidden bg-gray-800 group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#D89B2B]">
                        {img.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
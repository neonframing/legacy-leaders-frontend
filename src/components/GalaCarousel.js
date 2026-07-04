"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function GalaCarousel({ editions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextEdition = () => {
    setActiveIndex((prev) => (prev === editions.length - 1 ? 0 : prev + 1));
  };

  const prevEdition = () => {
    setActiveIndex((prev) => (prev === 0 ? editions.length - 1 : prev - 1));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev === activeEdition.images.length - 1 ? 0 : prev + 1));
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? activeEdition.images.length - 1 : prev - 1));
  };

  // Auto-cycle logic
  useEffect(() => {
    let interval;
    if (!isHovered && !isLightboxOpen) {
      interval = setInterval(() => {
        nextEdition();
      }, 5000); // Swaps every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered, activeIndex, isLightboxOpen]);

  const activeEdition = editions[activeIndex];

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        nextLightboxImage();
      }
      if (event.key === "ArrowLeft") {
        prevLightboxImage();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, activeEdition.images.length]);

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
            {activeEdition.year} Gala Highlights
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
        
        <button
          onClick={() => openLightbox(0)}
          className="group inline-flex items-center cursor-pointer gap-3 text-sm font-bold uppercase tracking-widest text-[#D89B2B] transition-colors hover:text-white"
        >
          View Gala Gallery
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
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
              <div
                className="relative aspect-square md:aspect-auto md:col-span-8 overflow-hidden bg-gray-800 cursor-pointer"
                onClick={() => openLightbox(0)}
              >
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
                  <div
                    key={imgIdx}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-gray-800 group cursor-pointer"
                    onClick={() => openLightbox(imgIdx + 1)}
                  >
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

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/90" onClick={closeLightbox} />

          <div className="relative z-10 w-full max-w-6xl">
            <button
              onClick={closeLightbox}
              className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white hover:text-[#344059]"
              aria-label="Close gala lightbox"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black sm:aspect-[16/9]">
              <Image
                src={activeEdition.images[lightboxIndex].src}
                alt={activeEdition.images[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {activeEdition.images.map((img, idx) => {
                const isActiveThumb = idx === lightboxIndex;

                return (
                  <button
                    key={`${img.src}-${idx}`}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 transition-all ${
                      isActiveThumb
                        ? "border-[#D89B2B] opacity-100"
                        : "border-white/30 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View gala image ${idx + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-white">
              <button
                onClick={prevLightboxImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#344059]"
                aria-label="Previous gala image"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                onClick={nextLightboxImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#344059]"
                aria-label="Next gala image"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
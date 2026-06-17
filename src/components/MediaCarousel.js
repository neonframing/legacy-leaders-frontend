"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaCarousel({ title, description, images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return null;
  }

  const activeImage = images[activeIndex];

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div className="space-y-5">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Sneaker Gala</p>
        <h3 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">{title}</h3>
        <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">{description}</p>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label={`View previous ${title} image`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#344059]/15 bg-white text-[#344059] transition-colors hover:border-[#D89B2B] hover:text-[#D89B2B]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={`View next ${title} image`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#344059]/15 bg-white text-[#344059] transition-colors hover:border-[#D89B2B] hover:text-[#D89B2B]"
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-3 flex items-center gap-2">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={`View ${title} image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-none transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-[#D89B2B]" : "w-2 bg-[#344059]/20 hover:bg-[#344059]/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-none border border-[#344059]/10 bg-[#f8f6f1] shadow-[0_20px_60px_rgba(52,64,89,0.12)]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="border-t border-[#344059]/8 bg-white px-6 py-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D89B2B]">{activeImage.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{activeImage.caption}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={`thumb-${image.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-none border transition-all ${
                index === activeIndex
                  ? "border-[#D89B2B] shadow-[0_12px_30px_rgba(216,155,43,0.22)]"
                  : "border-[#344059]/10 hover:border-[#344059]/25"
              }`}
              aria-label={`Select ${title} image ${index + 1}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 30vw"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

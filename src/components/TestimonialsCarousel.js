"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialsCarousel({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const total = testimonials.length;

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (!total) return current;
      return (current + 1) % total;
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (!total) return current;
      return (current - 1 + total) % total;
    });
  }, [total]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (total < 2 || isPaused) return undefined;
    const timer = setInterval(goNext, 5500);
    return () => clearInterval(timer);
  }, [goNext, isPaused, total]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX === null || endX === null) {
      touchStartX.current = null;
      return;
    }

    const distance = endX - startX;
    if (Math.abs(distance) > 40) {
      if (distance < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  };

  if (!total) return null;

  return (
    <div
      className="group overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Component overall min-height reduced from 42rem/46rem to values that gracefully scale content */}
      <div className="relative min-h-[26rem] sm:min-h-[20rem] lg:min-h-[16rem]">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial._id ?? index}
            aria-hidden={index !== activeIndex}
            className={`flex min-h-[26rem] sm:min-h-[20rem] lg:min-h-[16rem] flex-col transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex-row lg:items-stretch ${
              index === activeIndex ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            {/* Image section adjusted from 5/12 width to 4/12 for compactness */}
            <div className="relative w-full overflow-hidden bg-[#344059] aspect-[4/3] sm:aspect-[2/1] lg:w-4/12 lg:aspect-auto lg:min-h-full">
              {testimonial.imageUrl ? (
                <Image
                  src={testimonial.imageUrl}
                  alt={`${testimonial.name} testimonial`}
                  fill
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-[#344059]" />
              )}
              <div className="absolute inset-0 bg-[#344059]/10" />
            </div>

            {/* Typography updates applied inside text container block */}
            <div className="relative w-full bg-white p-6 pb-14 sm:p-10 sm:pb-16 lg:w-8/12 lg:p-12 lg:pb-16 flex flex-col justify-center">
              <Quote size={40} className="absolute left-6 top-6 text-gray-100/80" />
              <div className="relative z-10">
                {/* Removed uppercase, removed font-black, and lowered size to text-base/lg/xl */}
                <h3 className="mb-6 text-base font-medium tracking-normal leading-relaxed text-[#344059] sm:text-lg lg:text-xl italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-[#D89B2B]" />
                  <div>
                    {/* Removed uppercase modification */}
                    <p className="text-sm font-bold text-[#344059]">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {total > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex items-center justify-center">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-[#344059]/10 px-2.5 py-1.5 backdrop-blur-sm">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial._id ?? index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-2 w-2 rounded-full border border-[#D89B2B]/40 transition-all duration-500 ${
                    index === activeIndex ? "scale-110 bg-[#D89B2B]" : "bg-[#D89B2B]/20 hover:bg-[#D89B2B]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
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
      if (!total) {
        return current;
      }

      return (current + 1) % total;
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (!total) {
        return current;
      }

      return (current - 1 + total) % total;
    });
  }, [total]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (total < 2 || isPaused) {
      return undefined;
    }

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

  if (!total) {
    return null;
  }

  return (
    <div
      className="group overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative min-h-[42rem] lg:min-h-[46rem]">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial._id ?? index}
            aria-hidden={index !== activeIndex}
            className={`flex min-h-[42rem] flex-col transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-[46rem] lg:flex-row lg:items-stretch ${
              index === activeIndex ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            <div className="relative w-full overflow-hidden bg-[#344059] aspect-[2/3] sm:aspect-[3/4] lg:w-5/12 lg:aspect-auto lg:min-h-full">
              {testimonial.imageUrl ? (
                <Image
                  src={testimonial.imageUrl}
                  alt={`${testimonial.name} testimonial`}
                  fill
                  className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-[#344059]" />
              )}
              <div className="absolute inset-0 bg-[#344059]/24" />
            </div>

            <div className="relative w-full bg-white p-10 pb-20 sm:p-16 sm:pb-24 lg:w-7/12 lg:p-24 lg:pb-28">
              <Quote size={64} className="absolute left-12 top-12 text-gray-100" />
              <div className="relative z-10">
                <h3 className="mb-8 text-2xl font-black uppercase tracking-tighter leading-tight text-[#344059] sm:text-3xl lg:text-4xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </h3>
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-10 bg-[#D89B2B]" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-[#344059]">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {total > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-center justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#344059]/18 px-3 py-2 backdrop-blur-sm">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial._id ?? index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-2.5 w-2.5 rounded-full border border-[#D89B2B]/60 transition-all duration-500 ${
                    index === activeIndex ? "scale-110 bg-[#D89B2B]" : "bg-[#D89B2B]/25 hover:bg-[#D89B2B]/45"
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

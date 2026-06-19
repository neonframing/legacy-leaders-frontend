"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function InteractiveRequirements({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left List */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            onMouseEnter={() => setActiveIndex(idx)}
            className={`group flex items-start gap-5 p-6 border transition-all duration-300 cursor-pointer ${
              activeIndex === idx 
                ? 'border-[#D89B2B] bg-white shadow-md scale-[1.02]' 
                : 'border-gray-200 bg-gray-50 hover:bg-white'
            }`}
          >
            <div className={`mt-1 p-2 transition-colors duration-300 ${
              activeIndex === idx ? 'bg-[#D89B2B] text-white' : 'bg-gray-200 text-[#344059]'
            }`}>
              <ChevronRight size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[#344059] text-xl uppercase tracking-wide mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Image Reveal */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#344059]">
        {items.map((item, idx) => (
          <Image
            key={idx}
            src={item.image}
            alt={item.title}
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              activeIndex === idx ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0'
            }`}
          />
        ))}
        {/* Accent overlay for editorial feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#344059]/40 to-transparent z-20 pointer-events-none" />
      </div>
    </div>
  );
}
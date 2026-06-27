"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

export default function HeroVideo({ videoId, thumbnailSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Legacy Leaders video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div 
      className="relative aspect-video w-full cursor-pointer group bg-gray-900 overflow-hidden"
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={thumbnailSrc}
        alt="Video Thumbnail"
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-[#344059]/30 transition-opacity duration-300 group-hover:bg-[#344059]/40" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#344059] shadow-xl transition-all duration-300 group-hover:bg-[#D89B2B] group-hover:text-white group-hover:scale-110">
          <Play size={32} className="fill-current ml-1" />
        </div>
      </div>
    </div>
  );
}
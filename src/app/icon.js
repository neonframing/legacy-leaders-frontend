// app/icon.js
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // The wrapper needs standard flex properties to center the logo in the 64x64 canvas
      <div tw="flex flex-col items-center justify-center w-full h-full bg-white">
        <div tw="flex items-end justify-center" style={{ gap: '6px' }}>
          
          {/* Left bracket shape */}
          <div tw="relative flex h-7 w-5">
            <div tw="absolute right-0 top-0 h-full w-[3px] bg-[#D89B2B]"></div>
            <div tw="absolute bottom-0 right-0 h-[3px] w-full bg-[#D89B2B]"></div>
          </div>

          {/* Right bracket shape */}
          <div tw="relative flex h-7 w-5">
            <div tw="absolute left-0 top-0 h-full w-[3px] bg-[#D89B2B]"></div>
            <div tw="absolute bottom-0 left-0 h-[3px] w-full bg-[#D89B2B]"></div>
          </div>

        </div>
        
        {/* Text is included, though it will be very small at 64x64 */}
        <span tw="mt-2 text-[8px] font-bold tracking-widest text-[#344059]">
          LEGACY
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
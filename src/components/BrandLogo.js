export default function BrandLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 flex items-end justify-center space-x-[6px]">
        <div className="relative h-7 w-5">
          <div className="absolute right-0 top-0 h-full w-[3px] bg-[#D89B2B]"></div>
          <div className="absolute bottom-0 right-0 h-[3px] w-full bg-[#D89B2B]"></div>
        </div>
        <div className="relative h-7 w-5">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-[#D89B2B]"></div>
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#D89B2B]"></div>
        </div>
      </div>
      <span className="text-sm font-bold leading-none tracking-[0.15em] text-[#344059] md:text-base">
        LEGACY LEADERS
      </span>
    </div>
  );
}
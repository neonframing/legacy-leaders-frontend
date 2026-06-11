import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function OurProgramsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#344059]">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-12">
        <h1 className="text-4xl font-black uppercase tracking-tight text-[#344059]">Our Programs</h1>
      </main>
      <SiteFooter />
    </div>
  );
}

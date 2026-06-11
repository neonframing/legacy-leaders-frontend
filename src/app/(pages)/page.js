export const dynamic = 'force-dynamic';

import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, Heart, PlayCircle, Target, Users } from "lucide-react";
import { client, urlFor } from '@/lib/sanityClient';
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const revalidate = 60;

export default async function Home() {
  const query = `*[_type == "testimonial"]{
    _id,
    name,
    role,
    quote,
    image
  }`;

  const testimonials = await client.fetch(query, {}, {
    cache: 'no-store'
  });
  const testimonialSlides = testimonials.map((testimonial) => ({
    _id: testimonial._id,
    name: testimonial.name,
    role: testimonial.role,
    quote: testimonial.quote,
    imageUrl: testimonial.image ? urlFor(testimonial.image).url() : null,
  }));

  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main className="flex-1 bg-[var(--color-sand)] text-[var(--color-ink)]">
        <section className="relative overflow-hidden bg-[#fafafa] pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-20 opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-[#D89B2B]"></span>
              <h2 className="text-[#D89B2B] font-bold uppercase tracking-[0.2em] text-xs">
                Take Your Next Step
              </h2>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.8rem] font-black uppercase tracking-tighter leading-[0.95] text-[#344059] mb-10">
              Discover the <br />
              <span className="text-[#D89B2B]">purpose</span> you<br />
              were born to<br />
              fulfill.
            </h1>

            <p className="text-xl sm:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed mb-12 border-l-2 border-[#D89B2B] pl-6">
              Legacy Leaders equips youth and adults with the tools to develop their maximum potential and become purposeful leaders in their communities and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-[#344059] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] transition-all duration-300 flex items-center justify-center gap-3 group rounded-sm">
                Sign Up Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#hero-video"
                className="px-10 py-5 bg-transparent border border-gray-300 text-[#344059] font-bold uppercase tracking-widest text-xs hover:border-[#344059] transition-all duration-300 flex items-center justify-center gap-3 rounded-sm group"
              >
                <PlayCircle size={18} className="text-[#D89B2B] group-hover:scale-110 transition-transform" />
                Watch Our Story
              </a>
            </div>
            </div>

            <div id="hero-video" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/WOVMEkUkCHQ?rel=0"
                  title="Legacy Leaders video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B]">
                  <span className="h-px w-8 bg-[#D89B2B]" /> Our Programs
                </h2>
                <h3 className="text-4xl font-extrabold tracking-tight text-[#344059] md:text-5xl">
                  Empowering Leaders <br />
                  At Every Stage.
                </h3>
              </div>
              <a
                href="#programs"
                className="flex items-center gap-2 border-b-2 border-transparent pb-2 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:border-[#D89B2B] hover:text-[#D89B2B]"
              >
                View All Programs <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              <div className="group relative overflow-hidden border border-gray-200 bg-white p-10 transition-all duration-300 hover:border-[#344059] hover:shadow-2xl">
                <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-gray-50 transition-colors duration-300 group-hover:bg-[#D89B2B]">
                  <Target size={24} className="text-[#344059] group-hover:text-white" />
                </div>
                <h4 className="mb-4 mt-4 text-2xl font-bold text-[#344059]">Legacy Fellows</h4>
                <p className="mb-8 leading-relaxed text-gray-600">
                  For young adults (ages 21-30) seeking financial independence, life balance, and generational wealth through mentorship and entrepreneurial training.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                  Discover More <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="group relative overflow-hidden border border-gray-200 bg-[#344059] p-10 text-white transition-all duration-300 hover:border-[#344059] hover:shadow-2xl">
                <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-[#2a344a] transition-colors duration-300 group-hover:bg-[#D89B2B]">
                  <Users size={24} className="text-white group-hover:text-[#344059]" />
                </div>
                <h4 className="mb-4 mt-4 text-2xl font-bold text-white">Legacy Mentors</h4>
                <p className="mb-8 leading-relaxed text-gray-300">
                  A select group of seasoned professionals guiding young adults through leadership training and one-on-one coaching to help the next generation pay it forward.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-white">
                  Become a Mentor <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="group relative overflow-hidden border border-gray-200 bg-white p-10 transition-all duration-300 hover:border-[#344059] hover:shadow-2xl">
                <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-gray-50 transition-colors duration-300 group-hover:bg-[#D89B2B]">
                  <BookOpen size={24} className="text-[#344059] group-hover:text-white" />
                </div>
                <h4 className="mb-4 mt-4 text-2xl font-bold text-[#344059]">Legacy Development</h4>
                <p className="mb-8 leading-relaxed text-gray-600">
                  The best leaders never stop growing. Whether you're seeking personal clarity, professional development, stronger relationships, or greater impact, our coaching, retreats, trainings, and conferences are designed to help you reach your next level of leadership.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                  Start Developing <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="group relative overflow-hidden border border-gray-200 bg-white p-10 transition-all duration-300 hover:border-[#344059] hover:shadow-2xl">
                <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-gray-50 transition-colors duration-300 group-hover:bg-[#D89B2B]">
                  <Heart size={24} className="text-[#344059] group-hover:text-white" />
                </div>
                <h4 className="mb-4 mt-4 text-2xl font-bold text-[#344059]">Legacy Donor</h4>
                <p className="mb-8 leading-relaxed text-gray-600">
                  Fuel scholarships, mentorship, and leadership experiences by investing in the next generation of purpose-driven changemakers. Your philanthropic partnership provides the critical resources needed to transform raw potential into lasting, systemic community impact.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                  Give with Impact <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#344059] bg-[#344059] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 gap-12 text-center md:grid-cols-4 md:text-left md:divide-x md:divide-white/10">
              <div className="first:px-0 md:px-8">
                <p className="mb-2 text-5xl font-black tracking-tighter text-white sm:text-6xl">
                  15
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Years of Impact</p>
              </div>
              <div className="md:px-8">
                <p className="mb-2 text-5xl font-black tracking-tighter text-white sm:text-6xl">
                  4.5<span className="text-[#D89B2B]">k</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Participants Reached</p>
              </div>
              <div className="md:px-8">
                <p className="mb-2 text-5xl font-black tracking-tighter text-white sm:text-6xl">
                  150<span className="text-[#D89B2B]">+</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Mentors Connected</p>
              </div>
              <div className="md:px-8">
                <p className="mb-2 text-5xl font-black tracking-tighter text-white sm:text-6xl">
                  100<span className="text-[#D89B2B]">%</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Passion to Action</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <TestimonialsCarousel testimonials={testimonialSlides} />
          </div>
        </section>

        <section id="get-involved" className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 md:mb-16">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#D89B2B]">Take Action</h4>
              <h2 className="text-4xl font-extrabold leading-tight text-[#344059] md:text-5xl">GET INVOLVED.</h2>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#344059]">
                  <Heart className="h-8 w-8 text-[#D89B2B]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#344059]">Donate Today</h3>
                <p className="mb-6 text-gray-600">Your contributions directly fund our fellowship programs and expand our reach.</p>
                <a href="#" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Make a Donation <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#344059]">
                  <Briefcase className="h-8 w-8 text-[#D89B2B]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#344059]">Request an Intern</h3>
                <p className="mb-6 text-gray-600">Partner with us to bring highly-trained Legacy Fellows into your organization.</p>
                <a href="#" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#344059]">
                  <Users className="h-8 w-8 text-[#D89B2B]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#344059]">Volunteer Now</h3>
                <p className="mb-6 text-gray-600">Support events, mentor rising leaders, and help deliver meaningful programs across our communities.</p>
                <a href="#" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

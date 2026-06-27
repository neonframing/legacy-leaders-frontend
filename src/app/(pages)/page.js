export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, Heart, Target, Users } from "lucide-react";
import { client, urlFor } from '@/lib/sanityClient';
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Link from 'next/link';
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

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
                  <button className="px-10 py-5 bg-[#344059] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] transition-all duration-300 flex items-center cursor-pointer justify-center gap-3 group rounded-sm">
                    Sign Up Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div id="hero-video" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
                <HeroVideo 
                  videoId="WOVMEkUkCHQ" 
                  thumbnailSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-[#344059] bg-[#344059] py-15">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 gap-12 text-center md:grid-cols-4 md:text-left md:divide-x md:divide-white/10">
              <div className="first:px-0 md:px-8">
                <p className="mb-2 text-5xl font-black tracking-tighter text-white sm:text-6xl">15</p>
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
        
        {/* Our Programs Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B]">
                  <span className="h-px w-8 bg-[#D89B2B]" /> Our Programs
                </h2>
                <h3 className="text-4xl font-extrabold tracking-tight text-[#344059] md:text-5xl">
                  Empowering Leaders <br />At Every Stage.
                </h3>
              </div>
              <Link
                href="/our-programs"
                className="flex items-center gap-2 border-b-2 border-transparent pb-2 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:border-[#D89B2B] hover:text-[#D89B2B]"
              >
                View All Programs <ArrowRight size={16} />
              </Link>
            </div>

<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              
              {/* Legacy Fellows Card */}
              <div className="group relative overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-[#344059] hover:shadow-2xl flex flex-col">
                <div className="relative h-48 w-full bg-[#344059] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Legacy Fellows" 
                    fill 
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#344059]/50 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-white/10 backdrop-blur-md z-10">
                    <Target size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="mb-4 text-2xl font-bold text-[#344059]">Legacy Fellows</h4>
                    <p className="mb-8 leading-relaxed text-gray-600">
                      For young adults (ages 21-30) seeking financial independence, life balance, and generational wealth through mentorship and entrepreneurial training.
                    </p>
                  </div>
                  <Link href={{ pathname: '/our-programs', hash: 'legacy-fellows' }} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                    Discover More <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Legacy Mentors Card */}
              <div className="group relative overflow-hidden border border-gray-200 bg-[#344059] transition-all duration-300 hover:border-[#344059] hover:shadow-2xl flex flex-col">
                <div className="relative h-48 w-full bg-[#344059] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80" 
                    alt="Legacy Mentors" 
                    fill 
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#344059]/50 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-white/10 backdrop-blur-md z-10">
                    <Users size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h4 className="text-2xl font-bold text-white">Legacy Mentors</h4>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#D89B2B] text-[#344059] px-2 py-1 rounded-sm shrink-0">
                        Ages 35+
                      </span>
                    </div>
                    <p className="mb-8 leading-relaxed text-gray-300">
                      A select group of seasoned professionals guiding young adults through leadership training and one-on-one coaching to help the next generation pay it forward.
                    </p>
                  </div>
                  <Link href={{ pathname: '/our-programs', hash: 'legacy-mentors' }} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-white">
                    Become a Mentor <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Legacy Development Card */}
              <div className="group relative overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-[#344059] hover:shadow-2xl flex flex-col">
                <div className="relative h-48 w-full bg-[#344059] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                    alt="Legacy Development" 
                    fill 
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#344059]/50 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-white/10 backdrop-blur-md z-10">
                    <BookOpen size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="mb-4 text-2xl font-bold text-[#344059]">Legacy Development</h4>
                    <p className="mb-8 leading-relaxed text-gray-600">
                      The best leaders never stop growing. Whether you're seeking personal clarity, professional development, stronger relationships, or greater impact, our coaching, retreats, trainings, and conferences are designed to help you reach your next level of leadership.
                    </p>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                    Start Developing <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Legacy Donor Card */}
              <div className="group relative overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-[#344059] hover:shadow-2xl flex flex-col">
                <div className="relative h-48 w-full bg-[#344059] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                    alt="Legacy Donor" 
                    fill 
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#344059]/50 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-3xl bg-white/10 backdrop-blur-md z-10">
                    <Heart size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="mb-4 text-2xl font-bold text-[#344059]">Legacy Donor</h4>
                    <p className="mb-8 leading-relaxed text-gray-600">
                      Fuel scholarships, mentorship, and leadership experiences by investing in the next generation of purpose-driven changemakers. Your philanthropic partnership provides the critical resources needed to transform raw potential into lasting, systemic community impact.
                    </p>
                  </div>
                  <Link href={{ pathname: '/get-involved', hash: 'legacy-donor' }} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059]">
                    Give with Impact <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
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
                <Link href="/get-involved#legacy-donor" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Make a Donation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#344059]">
                  <Briefcase className="h-8 w-8 text-[#D89B2B]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#344059]">Request an Intern</h3>
                <p className="mb-6 text-gray-600">Partner with us to bring highly-trained Legacy Fellows into your organization.</p>
                <Link href="/get-involved#request-intern" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#344059]">
                  <Users className="h-8 w-8 text-[#D89B2B]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#344059]">Volunteer Now</h3>
                <p className="mb-6 text-gray-600">Support events, mentor rising leaders, and help deliver meaningful programs across our communities.</p>
                <Link href="/get-involved#volunteer" className="inline-flex items-center border-b-2 border-[#D89B2B] pb-1 text-sm font-bold uppercase tracking-widest text-[#344059] transition-colors hover:text-[#D89B2B]">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
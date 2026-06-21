import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Mail, ShieldCheck, CheckCircle2, ArrowUpRight, Target } from "lucide-react";

export const runtime = 'edge';

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main>
        {/* --- 1. HERO SECTION --- */}
        <section className="relative overflow-hidden bg-[#f6f1e8] px-6 pb-20 pt-36 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-white/40 lg:block" />
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#D89B2B]"></span>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Take Action</p>
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter text-[#344059] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.92]">
                Get <br />Involved.
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-gray-600 sm:text-xl border-l-2 border-[#D89B2B] pl-6">
                It takes a village to provide the resources and support needed to transform a life. Discover how you can partner with Legacy Leaders to create lasting impact.
              </p>
            </div>
          </div>
        </section>

        {/* --- 2. REQUEST AN INTERN --- */}
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28 border-b border-[#344059]/10">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
              
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 shadow-[0_24px_80px_rgba(52,64,89,0.12)]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Professionals collaborating in an office"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#344059]/10" />
                <div className="absolute bottom-0 left-0 bg-[#D89B2B] p-6 text-white flex items-center gap-4">
                  <p className="font-bold uppercase tracking-widest text-sm">Corporate Partners</p>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Corporate Pipeline</h4>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl mb-8">
                  Request a Legacy Intern for your Company.
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-600 mb-10">
                  <p>
                    One of the most impactful ways you can invest in a Legacy Fellow is by providing an internship opportunity within your organization. Internships give Fellows the chance to gain real-world experience, develop professional skills, explore career interests, and build confidence in a workplace setting. 
                  </p>
                  <p>
                    For many young adults, these opportunities serve as a critical bridge between education and employment, helping them better understand their strengths while preparing them for long-term success.
                  </p>
                  <p>
                    By hosting a Fellow, you are not simply filling a temporary role—you are helping shape the next generation of leaders. Your organization gains access to motivated, emerging talent while providing a meaningful learning experience that can influence a Fellow's future career path. 
                  </p>
                </div>
                
                <div className="bg-[#f8f6f1] p-8 border-l-4 border-[#D89B2B] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <p className="text-[#344059] font-bold">
                    If you are interested in offering an internship opportunity through the Legacy Fellows Program, we invite you to complete the application.
                  </p>
                  <a 
                    href="#" 
                    className="whitespace-nowrap px-8 py-4 bg-[#344059] !text-white font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] transition-colors flex items-center gap-3 group"
                  >
                    Apply to Host <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. DONATE TODAY --- */}
        <section className="bg-[#344059] text-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            
            {/* Donate Header */}
            <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Donate Today</h4>
                <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl mb-6 leading-[1.1]">
                  Invest in the Next Generation of Leaders.
                </h2>
                <p className="text-2xl font-bold text-white/90">
                  Your Gift Creates Lasting Impact.
                </p>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-white/80 lg:border-l lg:border-white/20 lg:pl-10">
                <p>
                  Every great leader's journey begins with someone who believed in them. At Legacy Leaders, we are committed to equipping emerging leaders with the mentorship, training, experiences, and opportunities they need to reach their full potential and create meaningful change in their communities.
                </p>
                <p>
                  When you invest in Legacy Leaders, you're doing more than making a donation—you're helping provide leadership development, mentorship, career exploration, internships, community service opportunities, and life-changing experiences for young people and emerging professionals. Your generosity helps us remove barriers, expand opportunities, and empower individuals to become leaders in their families, workplaces, and communities.
                </p>
              </div>
            </div>

            {/* Support Tiers */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Ambassador Card */}
              <div className="bg-white/5 border border-white/10 p-10 lg:p-14 hover:bg-white/10 transition-colors flex flex-col">
                <div className="w-16 h-16 bg-[#D89B2B] flex items-center justify-center mb-8">
                  <Heart size={32} className="text-[#344059]" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Become a Legacy Ambassador</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[#D89B2B] mb-6 border-b border-white/10 pb-4">Monthly Donation</p>
                <p className="text-white/80 leading-relaxed mb-8 flex-1">
                  Join a growing community of monthly supporters who are committed to developing the next generation of leaders. As a Legacy Ambassador, your recurring gift provides sustainable funding that allows us to expand our programs, strengthen mentorship opportunities, and increase our impact locally and globally. No matter the amount, your monthly investment helps create opportunities that change lives.
                </p>
                <a 
                  href="#" 
                  className="w-full text-center px-8 py-5 bg-[#D89B2B] !text-[#344059] font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] hover:!text-white transition-colors"
                >
                  Give Monthly
                </a>
              </div>

              {/* Partner Card */}
              <div className="bg-white/5 border border-white/10 p-10 lg:p-14 hover:bg-white/10 transition-colors flex flex-col">
                <div className="w-16 h-16 bg-white flex items-center justify-center mb-8">
                  <Target size={32} className="text-[#344059]" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Become a Legacy Partner</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[#D89B2B] mb-6 border-b border-white/10 pb-4">One-Time or Annual Donation</p>
                <p className="text-white/80 leading-relaxed mb-8 flex-1">
                  Whether through a one-time, monthly, or annual contribution, your support directly fuels the mission of Legacy Leaders. Every gift helps us continue developing purpose-driven leaders who are equipped to make a difference for generations to come. Together, we can create a ripple effect of positive change that extends far beyond a single individual.
                </p>
                <a 
                  href="#" 
                  className="w-full text-center px-8 py-5 bg-[#D89B2B] !text-[#344059] font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] hover:!text-white transition-colors"
                >
                  Give One Time
                </a>
              </div>
            </div>

            {/* Tax & Privacy Info Block */}
            <div className="grid lg:grid-cols-3 gap-8 border-t border-white/20 pt-16">
              <div>
                <h4 className="flex items-center gap-3 text-lg font-bold uppercase tracking-tight mb-4 text-[#D89B2B]">
                  <ShieldCheck size={24} /> Your Support Matters
                </h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  Legacy Leaders is a tax-exempt charitable organization recognized under Section 501(c)(3) of the Internal Revenue Code. All contributions, grants, and bequests are tax-deductible as permitted by law. A donation receipt will be provided for all contributions.
                </p>
              </div>
              <div>
                <h4 className="flex items-center gap-3 text-lg font-bold uppercase tracking-tight mb-4 text-[#D89B2B]">
                  <CheckCircle2 size={24} /> Privacy Commitment
                </h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  We are committed to protecting the privacy of our supporters. Legacy Leaders does not sell, share, or distribute donor information to third parties and will never send donor communications on behalf of other organizations.
                </p>
              </div>
              <div className="bg-white/10 p-8 flex flex-col justify-center items-start">
                <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Questions?</h4>
                <p className="text-sm text-white/70 mb-6">We would love to connect with you.</p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:!text-[#D89B2B] transition-colors"
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* --- 4. VOLUNTEER --- */}
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
              
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Volunteer</h4>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl mb-8">
                  Volunteer With Legacy Leaders.
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-600 mb-10">
                  <p>
                    Every meaningful impact begins with someone willing to give their time, talents, and heart to serve others. At Legacy Leaders, volunteers play a vital role in helping us develop the next generation of leaders through mentorship, events, workshops, community service projects, fundraising efforts, and program support. Whether you can give a few hours a year or are looking for a more ongoing commitment, there are opportunities for individuals of all backgrounds and experience levels to get involved.
                  </p>
                  <p>
                    Volunteering with Legacy Leaders is more than just serving—it's an opportunity to invest in the future of young people and emerging leaders while building meaningful connections with others who share a passion for making a difference. From event support and program facilitation to professional expertise and behind-the-scenes assistance, every volunteer helps create experiences that empower participants to discover their potential and pursue their purpose.
                  </p>
                  <p className="font-bold text-[#344059]">
                    If you're ready to make an impact and become part of the Legacy Leaders community, we invite you to complete our Volunteer Interest Application below. A member of our team will follow up with you to discuss available opportunities and help you find the best fit for your interests and availability.
                  </p>
                </div>
                <a 
                  href="#" 
                  className="inline-flex px-8 py-4 bg-[#D89B2B] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#344059] hover:!text-[#D89B2B] transition-colors items-center gap-3 group"
                >
                  Apply Here to Become a Volunteer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Volunteer Image Collage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                    alt="Volunteers with hands in"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden bg-gray-100 mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80"
                    alt="Mentorship event"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
                    alt="Fellows working together"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden bg-[#344059] flex items-center justify-center p-6 text-center mt-8">
                   <div className="space-y-2">
                     <Users size={48} className="text-[#D89B2B] mx-auto" />
                     <p className="font-bold text-white uppercase tracking-widest text-sm">Join The Community</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 5. FELLOWS & MENTORS LINKS --- */}
        <section className="bg-[#f8f6f1] px-6 py-20 lg:px-12 lg:py-28 border-y border-[#344059]/10">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
            
            {/* Fellow Link Card */}
            <div className="group relative overflow-hidden bg-white border border-[#344059]/10 min-h-[400px] flex flex-col justify-end p-10 hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 group-hover:bg-[#D89B2B] transition-colors duration-300 flex items-center justify-center rounded-bl-[2rem] z-20">
                <ArrowUpRight size={32} className="text-[#344059] group-hover:text-white" />
              </div>
              <div className="relative z-20">
                <h3 className="text-3xl font-black uppercase tracking-tight text-[#344059] mb-4">Become a Legacy Fellow</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Join our next cohort to gain the mentorship, network, and practical leadership skills necessary to maximize your potential.
                </p>
                <Link 
                  href="/our-programs" 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D89B2B] group-hover:text-[#344059] border-b-2 border-transparent group-hover:border-[#344059] pb-1 transition-all"
                >
                  View Program Details
                </Link>
              </div>
              {/* Background accent */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f8f6f1] rounded-tl-full opacity-50 z-0 group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Mentor Link Card */}
            <div className="group relative overflow-hidden bg-[#344059] min-h-[400px] flex flex-col justify-end p-10 hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 group-hover:bg-[#D89B2B] transition-colors duration-300 flex items-center justify-center rounded-bl-[2rem] z-20">
                <ArrowUpRight size={32} className="text-white" />
              </div>
              <div className="relative z-20">
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Become a Legacy Mentor</h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Share your expertise, expand your network, and guide a young adult through their leadership and professional development journey.
                </p>
                <Link 
                  href="/our-programs" 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest !text-[#D89B2B] group-hover:text-white border-b-2 border-transparent group-hover:border-[#D89B2B] pb-1 transition-all"
                >
                  View Program Details
                </Link>
              </div>
              {/* Background accent */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-tl-full opacity-50 z-0 group-hover:scale-150 transition-transform duration-700"></div>
            </div>

          </div>
        </section>

        {/* --- 6. FINAL CTA --- */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#344059] mb-8">
              Ready to Shape <br />What Comes Next?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Whether you are looking to accelerate your own growth or invest in the leaders of tomorrow, there is a place for you at Legacy Leaders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="px-10 py-5 bg-[#D89B2B] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#344059] hover:!text-[#D89B2B] transition-all flex items-center justify-center gap-3 group rounded-none"
              >
                <Mail size={16} className="group-hover:-translate-y-1 transition-transform" /> Contact Our Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
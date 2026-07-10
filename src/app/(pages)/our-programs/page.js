import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, PlayCircle, Target, Users, BookOpen, CheckCircle2, ArrowDown } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InteractiveRequirements from "@/components/InteractiveRequirements";
import HeroVideo from "@/components/HeroVideo";

// --- Content Data ---

const fellowsGains = [
  {
    title: "Discover Your Purpose",
    desc: "Gain greater clarity about who you are, what you value, and how your unique gifts can make a meaningful impact in the world through DISC and other assessments.",
    image: "/IMG_7142.jpg"
  },
  {
    title: "A Strong Professional Network",
    desc: "Connect with mentors, leaders, and peers who can support your growth.",
    image: "/IMG_1907.jpg"
  },
  {
    title: "A Credential That Sets You Apart",
    desc: "Receive a certificate of completion that highlights your leadership experience and helps distinguish you in academic, professional, and career opportunities.",
    image: "/DSC06875.jpg"
  },
  {
    title: "Accelerate Your Career or Business",
    desc: "Gain practical leadership, communication, and professional skills that can help you earn greater responsibilities, pursue new opportunities, or launch and grow your own business.",
    image: "/IMG_1837.jpg"
  }
];

const fellowsRequirements = [
  {
    title: "Monthly Training",
    desc: "Legacy Fellows (ages 21-30) meet every last Saturday of the month from August through May in Chicago (8am to 3pm).",
    image: "/IMG_7277(1).jpg"
  },
  {
    title: "Out-of-State Retreat",
    desc: "This will take place in Lake Geneva, Wisconsin from October 8th to the 11th.",
    image: "/Retreatimg.png"
  },
  {
    title: "Mentor Coaching",
    desc: "You will be partnered with a professional mentor coach throughout the program cycle to meet with virtually.",
    image: "/MGP06992.jpg"
  },
  {
    title: "Capstone Event",
    desc: "This is designed to bring all of your learnings together with all your other Fellows at the end of the program.",
    image: "/IMG_1966.jpg"
  }
];

const mentorPathways = [
  {
    title: "Meaningful Mentorship",
    desc: "Meet with a young adult Fellow virtually once a month (held on the last Saturday of each month from 11:00 AM - 12:00 PM) through conversations that provide guidance, encouragement, accountability, and support throughout their leadership journey from September through May."
  },
  {
    title: "Ongoing Development & Community",
    desc: "Attend 4 mentor virtual training sessions and engage in two in-person events designed to strengthen your impact and connection to the Legacy Leaders community."
  },
  {
    title: "Invest in Future Leaders",
    desc: "Partner with Fellows as they work through leadership development topics, helping them apply new concepts, navigate challenges, and grow personally and professionally."
  },
  {
    title: "Open Doors to Opportunity",
    desc: "Leverage your experience, connections, and network to help Fellows explore careers, discover opportunities, and expand their vision for what's possible."
  }
];

const mentorQualifications = [
  "Bring Professional Experience – Typically 35+ years old with leadership, coaching, mentoring, or industry experience.",
  "Lead with Character – Demonstrate integrity, humility, compassion, and a commitment to leading by example.",
  "Listen & Support Well – Create a safe space for Fellows to share, learn, and grow through authentic conversations.",
  "Embrace Growth & Problem Solving – Encourage Fellows through challenges while helping them identify solutions and opportunities.",
  "Serve with Passion – Are committed to helping others succeed and willing to go the extra mile to support Fellow development.",
  "Value Diversity & Inclusion – Respect and celebrate different backgrounds, experiences, and perspectives.",
  "Education – Bachelor's degree preferred, but not required.",
  "Commit to Engagement – Participate in monthly mentor meetings, training opportunities, and ongoing communication with Fellows throughout the program year."
];

const coachingSteps = [
  {
    title: "Discover",
    subtitle: "Gain Clarity on Who You Are",
    desc: "Every coaching journey begins with self-awareness. Through assessments, reflection, feedback, and meaningful conversations, clients identify their strengths, blind spots, values, passions, and opportunities for growth.",
    outcomes: ["Greater self-awareness", "Clarity of strengths and opportunities", "Understanding of leadership style", "Increased confidence and purpose"]
  },
  {
    title: "Align",
    subtitle: "Connect Your Values to Your Vision",
    desc: "Once clarity is established, coaching helps individuals align their actions, priorities, and goals with the leader they want to become. This stage focuses on creating intentional plans and eliminating barriers that create inconsistency.",
    outcomes: ["Clear personal and professional goals", "Increased focus and accountability", "Improved decision-making", "Stronger alignment between values and actions"]
  },
  {
    title: "Grow",
    subtitle: "Develop the Skills to Lead Effectively",
    desc: "Growth happens through action. Coaches challenge and support clients as they develop leadership competencies such as communication, emotional intelligence, delegation, conflict management, influence, and strategic thinking.",
    outcomes: ["Improved leadership effectiveness", "Stronger communication skills", "Increased emotional intelligence", "Better team and relationship outcomes"]
  },
  {
    title: "Multiply",
    subtitle: "Create Lasting Impact and Legacy",
    desc: "Leadership is not just about personal success—it's about empowering others. In the final phase, clients focus on sustaining growth, developing others, and creating meaningful impact within their organizations, families, and communities.",
    outcomes: ["Increased influence and impact", "Stronger mentoring and coaching abilities", "Sustainable leadership habits", "A legacy of developing others"]
  }
];

export default function OurProgramsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main>
        {/* --- 1. LEGACY FELLOWS HERO --- */}
        <section id="fellows" className="relative overflow-hidden bg-[#f6f1e8] px-6 pb-16 pt-32 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#D89B2B]"></span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-[#344059] sm:text-5xl lg:text-[4.4rem] lg:leading-[0.95]">
                Legacy <br />Fellows.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Legacy Fellows (ages 21-30) help leaders of color achieve financial independence and life balance by discovering their purpose, developing business opportunities, and creating a network of success that generates generational wealth. We elevate young adults to become the best version of themselves and teach them to share their stories with the world!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-5">
                <button className="px-10 py-5 bg-[#344059] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 group rounded-none">
                  Apply for Fellowship
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <HeroVideo
                videoId="BLSYwYzxt7Y"
                thumbnailSrc="/IMG_6995.jpg"
              />
            </div>
          </div>
        </section>

        {/* --- 2. WHAT YOU'LL GAIN --- */}
        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">What Am I Getting Out Of It?</h4>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl max-w-3xl">
                What You'll Gain
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-600 max-w-3xl">
                As a Legacy Fellow, you'll gain access to meaningful experiences, valuable relationships, and practical leadership development opportunities designed to help you grow with purpose, confidence, and impact. Here's what you can expect:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {fellowsGains.map((gain, idx) => (
                <div key={idx} className="group relative border border-[#344059]/10 overflow-hidden min-h-[300px] flex flex-col justify-end p-5 lg:p-6">
                  <Image 
                    src={gain.image} 
                    alt={gain.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[800ms] scale-100 group-hover:scale-105 z-0" 
                  />
                  
                  <div className="relative z-20 bg-white/90 p-4 sm:p-5">
                    <span className="block text-3xl font-black text-[#344059]/20 mb-2">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-[#344059] mb-2">
                      {gain.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {gain.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. WHAT WE ASK OF YOU --- */}
        <section className="bg-[#f8f6f1] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">What Am I Putting In?</h4>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl mb-5">
                What We Ask of You
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                Great leaders aren't developed by chance—they are shaped through commitment, growth, and meaningful experiences. As a Legacy Fellow, you'll have the opportunity to invest in yourself, build authentic relationships, embrace new challenges, and actively engage in the learning process. We ask Fellows to bring their best effort, an open mind, and a willingness to grow. 
              </p>
            </div>

            <InteractiveRequirements items={fellowsRequirements} />
          </div>
        </section>

        {/* --- 4. LEADERSHIP MODELS IMAGE BREAK --- */}
        <section className="w-full bg-[#344059] px-6 py-14 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Fellows Leadership Model</h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">+ Personal Leadership Model</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden border border-white/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <Image
                  src="/Leadershipmodel.png"
                  alt="Fellows Leadership Model"
                  width={1400}
                  height={900}
                  className="h-full w-full object-contain bg-white"
                />
              </div>
              <div className="overflow-hidden border border-white/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <Image
                  src="/PersonalLeadershipModel.png"
                  alt="Personal Leadership Model"
                  width={1400}
                  height={900}
                  className="h-full w-full object-contain bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. FELLOWS CTA SECTION --- */}
        <section className="bg-white border-y border-[#344059]/10">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#344059] mb-3">
                Ready to accelerate your leadership journey?
              </h2>
              <p className="text-gray-600 text-base">
                Join the next cohort of Legacy Fellows and start building the foundation for your future impact.
              </p>
            </div>
            <Link href="/legacy-fellows-application" className="whitespace-nowrap px-8 py-4 bg-[#D89B2B] !text-white font-bold uppercase tracking-widest cursor-pointer text-xs hover:bg-[#344059] hover:!text-white transition-all duration-300 flex items-center justify-center gap-3 group rounded-none shrink-0">
              Apply for Fellowship
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* --- 6. LEGACY MENTORS (Intro) --- */}
        <section id="legacy-mentors" className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Preferred Age 35+</p>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl mb-6">
                  Legacy Mentors.
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-gray-600">
                  <p className="font-bold text-[#344059] text-xl mb-1">
                    One conversation can change a life.
                  </p>
                  <p>
                    As a Legacy Leaders Mentor, you'll have the opportunity to invest in a young adult's personal, professional, and leadership development by sharing your experiences, encouragement, and wisdom. 
                  </p>
                  <p>
                    Through meaningful relationships and intentional guidance, mentors help participants discover their potential, navigate challenges, and pursue their goals with greater confidence. Whether you're a seasoned professional, entrepreneur, or community leader, your influence can create a lasting impact that extends far beyond the program.
                  </p>
                </div>
              </div>
              
              <div className="relative w-full aspect-[4/5] lg:aspect-[16/10] bg-gray-100 overflow-hidden">
                 <Image 
                   src="/MGP06481.jpg" 
                   alt="Mentor coaching a fellow" 
                   fill
                   className="object-cover"
                 />
                 <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D89B2B] z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 7. YOUR INVESTMENT (4 Pathways) --- */}
        <section className="bg-[#344059] text-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h4 className="uppercase tracking-[0.2em] text-[#D89B2B] text-sm font-bold mb-4">Your Investment</h4>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                How Mentors Make An Impact.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left divide-y md:divide-y-0 md:divide-x divide-white/20">
              {mentorPathways.map((pathway, idx) => (
                <div key={idx} className={`pt-6 md:pt-0 ${idx !== 0 ? 'md:pl-8' : ''}`}>
                  <span className="block text-5xl font-black text-white/10 mb-3">0{idx + 1}</span>
                  <h3 className="text-xl font-bold mb-4 text-[#D89B2B] uppercase tracking-wide">{pathway.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{pathway.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 8. MENTOR QUALIFICATIONS --- */}
        <section className="relative overflow-hidden bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <Image
            src="/DSC06564.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale opacity-55 pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/65" />
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="max-w-3xl mb-12">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Who We Look For</h4>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl mb-5">
                Ideal Mentor Qualifications.
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                We are seeking mentors who are committed to investing in the next generation of leaders. 
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mb-12">
              {mentorQualifications.map((qual, idx) => {
                const [title, desc] = qual.split(" – ");
                return (
                  <div key={idx} className="flex gap-4 items-start p-5 bg-gray-50 border border-gray-100 hover:border-[#D89B2B]/50 transition-colors">
                    <CheckCircle2 className="text-[#D89B2B] w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-[#344059] text-base mb-1">{title}</p>
                      {desc && <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#f8f6f1] p-8 border-l-4 border-[#D89B2B] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[#344059] font-bold mb-2">Invest in the Mission</p>
                <p className="text-gray-600">
                  Believe in developing future leaders and actively contribute to the success of the Legacy Fellows Program.
                </p>
              </div>
              <Link href="/legacy-mentors-application" className="whitespace-nowrap px-8 py-4 bg-[#344059] !text-white font-bold uppercase tracking-widest cursor-pointer text-xs hover:bg-[#D89B2B] hover:!text-white transition-all duration-300 flex items-center justify-center gap-3 group rounded-none shrink-0">
                Become a Legacy Mentor
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* --- 9. LEGACY COACHING WITH CONNECTING ARROWS --- */}
        <section id="legacy-coaching" className="bg-[#f6f1e8] px-6 py-16 sm:py-20 lg:px-10 lg:py-24 relative overflow-hidden">
          <div className="mx-auto max-w-7xl relative">

            {/* Promise & Services Split */}
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 bg-[#344059] text-white p-8 md:p-12 relative z-10 mb-14">
               <div>
                  <h4 className="uppercase tracking-[0.24em] text-[#D89B2B] text-sm font-bold mb-6">Legacy Coaching Promise</h4>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-6">
                    Discover who you are. <br/>
                    <span className="text-gray-400">Align with where you're going.</span> <br/>
                    Grow into the leader you're meant to become. <br/>
                    <span className="text-[#D89B2B]">Multiply your impact for generations to come.</span>
                  </h3>
               </div>
               
               <div className="lg:border-l border-white/20 lg:pl-8">
                  <h4 className="uppercase tracking-[0.24em] text-[#D89B2B] text-sm font-bold mb-6">Services Included in the Model</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {[
                      "Executive Coaching", "Leadership Coaching", "Career Coaching", 
                      "Entrepreneur Coaching", "DISC Assessments", "360 Feedback Assessments", 
                      "Team Development Coaching", "Leadership Retreats", "Peer Coaching Circles"
                    ].map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-[#D89B2B]" />
                        {service}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
            
            <div className="text-center mb-14">
              <h4 className="uppercase tracking-[0.24em] text-[#D89B2B] text-sm font-bold mb-4">Professional Development</h4>
              <h2 className="text-3xl md:text-4xl font-black text-[#344059] tracking-tight mb-6">
                THE LEGACY COACHING MODEL™
              </h2>
            </div>

            {/* Desktop SVG Connecting Arrow Overlay */}
            <div className="hidden xl:block absolute top-[220px] left-0 right-0 z-0 h-32 pointer-events-none">
              <svg width="100%" height="100%" preserveAspectRatio="none" className="stroke-[#D89B2B]/30" strokeWidth="2" fill="none" strokeDasharray="8 8">
                <path d="M 12% 0 Q 30% 120 38% 0" />
                <path d="M 38% 0 Q 55% 120 62% 0" />
                <path d="M 62% 0 Q 80% 120 88% 0" />
              </svg>
            </div>

            {/* The 4 Steps */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 relative z-10">
              {coachingSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Step Card */}
                  <div className="bg-white p-8 border border-[#344059]/10 shadow-sm relative overflow-hidden group flex-1">
                    <div className="absolute top-0 right-0 w-14 h-14 bg-[#f8f6f1] group-hover:bg-[#D89B2B] transition-colors duration-300 flex items-center justify-center rounded-bl-3xl z-10">
                      <span className="text-xl font-black text-[#344059] group-hover:text-white">
                        {idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black uppercase text-[#344059] mb-2">{step.title}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#D89B2B] mb-5 min-h-[36px]">{step.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{step.desc}</p>
                    
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#344059] mb-4 border-b pb-2">Outcomes</p>
                      <ul className="space-y-2">
                        {step.outcomes.map((outcome, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-[#D89B2B] mt-0.5">•</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Mobile Downward Arrow (Shows only on smaller screens between cards) */}
                  {idx < coachingSteps.length - 1 && (
                    <div className="xl:hidden flex justify-center py-4">
                      <ArrowDown size={28} className="text-[#D89B2B]/50 animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- 10. FINAL DUAL CTA SECTION --- */}
        <section className="bg-white border-t border-[#344059]/10">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-22">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#344059] mb-5">
                Take Your Next Step
              </h2>
              <p className="text-lg text-gray-600">
                Whether you are looking to accelerate your own growth or invest in the leaders of tomorrow, there is a place for you at Legacy Leaders.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#f8f6f1] p-8 md:p-10 text-center border border-[#344059]/10 hover:border-[#D89B2B] transition-colors">
                <Users className="w-10 h-10 text-[#D89B2B] mx-auto mb-5" />
                <h3 className="text-xl font-black uppercase tracking-tight text-[#344059] mb-3">Become a Legacy Fellow</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join our next cohort to gain the mentorship, network, and skills necessary to maximize your potential.
                </p>
                <Link href="/legacy-fellows-application" className="mx-auto inline-flex px-7 py-3 bg-[#344059] !text-white cursor-pointer font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] hover:!text-white transition-all items-center justify-center gap-3 group rounded-none">
                  Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-[#f8f6f1] p-8 md:p-10 text-center border border-[#344059]/10 hover:border-[#D89B2B] transition-colors">
                <Target className="w-10 h-10 text-[#D89B2B] mx-auto mb-5" />
                <h3 className="text-xl font-black uppercase tracking-tight text-[#344059] mb-3">Become a Legacy Mentor</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share your expertise and guide a young adult through their leadership and professional development journey.
                </p>
                <Link href="#" className="mx-auto inline-flex px-7 py-3 bg-[#344059] !text-white cursor-pointer font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] hover:!text-white transition-all items-center justify-center gap-3 group rounded-none">
                  Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-[#f8f6f1] p-8 md:p-10 text-center border border-[#344059]/10 hover:border-[#D89B2B] transition-colors">
                <BookOpen className="w-10 h-10 text-[#D89B2B] mx-auto mb-5" />
                <h3 className="text-xl font-black uppercase tracking-tight text-[#344059] mb-3">Get Coaching</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Gain clarity, align your goals, and build practical leadership habits through the Legacy Coaching Model.
                </p>
                <Link href="/contact-us" className="mx-auto inline-flex px-7 py-3 bg-[#344059] !text-white cursor-pointer font-bold uppercase tracking-widest text-xs hover:bg-[#D89B2B] hover:!text-white transition-all items-center justify-center gap-3 group rounded-none">
                  Get Coaching <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
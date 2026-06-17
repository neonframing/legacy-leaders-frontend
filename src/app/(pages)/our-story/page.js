import Image from "next/image";
import { ArrowRight, Globe2, Handshake, Quote, Sparkles, Users } from "lucide-react";

export const runtime = 'edge';

import MediaCarousel from "@/components/MediaCarousel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { client, urlFor } from "@/lib/sanityClient";

const applicationLink = "https://gemini.google.com/u/0/app/b95da039e13652a4";

const historyImages = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    alt: "Legacy Leaders group session",
  },
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    alt: "Mentor leading a workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    alt: "Community event with young adults",
  },
];

const fellowsByYear = [
  {
    year: "Cycle One",
    label: "2021",
    title: "Foundations of confidence",
    description: "The first fellowship cohort centered identity, confidence, and career clarity for emerging leaders ready to take purposeful first steps.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "Cycle Two",
    label: "2022",
    title: "Mentorship in motion",
    description: "The second class deepened mentor relationships, leadership coaching, and accountability systems that helped fellows move from ideas to action.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "Cycle Three",
    label: "2023",
    title: "Networks that open doors",
    description: "Professional exposure, community service, and peer connection expanded what fellows believed was possible for their families and futures.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "Cycle Four",
    label: "2024",
    title: "Leadership with strategy",
    description: "Participants sharpened practical leadership skills while building stronger career plans, community impact, and personal discipline.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "Cycle Five",
    label: "2025",
    title: "The next legacy",
    description: "The newest cohort continues the flagship journey with mentorship, professional development, and transformational experiences for the next wave of leaders.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
];

const boardMembers = [
  {
    name: "Liv Peterson",
    role: "Board Chair",
    company: "Creative Entrepreneur, Liv More Media",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    bio: "Liv brings a creative strategist's lens to board leadership, helping Legacy Leaders sharpen its story, deepen community reach, and stay rooted in authentic impact.",
  },
  {
    name: "Nelly Taromina",
    role: "Vice Chair",
    company: "Chief Executive Officer, JADA Construction & Design",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    bio: "Nelly contributes executive vision and operational insight that help move bold ideas from concept to action while keeping long-term sustainability in focus.",
  },
  {
    name: "Everett Gutierrez Jr.",
    role: "Ex-Officio",
    company: "President & Founder, Legacy Leaders",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    bio: "Everett keeps the board connected to the heart of the mission, ensuring every strategic decision reflects the lived needs and potential of the communities served.",
  },
  {
    name: "Thomas Kunkle",
    role: "Treasurer",
    company: "Financial Advisor, WestPoint Financial Group",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    bio: "Thomas offers financial oversight and discipline that strengthen stewardship, growth planning, and the long-term resilience of the organization.",
  },
  {
    name: "Christina Roberson-Smeltzer",
    role: "Secretary",
    company: "Vice President of Public Affairs, Maze of Life",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    bio: "Christina brings communications, public affairs, and governance expertise that helps Legacy Leaders build trust, visibility, and stronger external relationships.",
  },
  {
    name: "Mary Douglas",
    role: "Advisory Board Chair",
    company: "Inside Sales Specialist, KeHE Food Distributors",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    bio: "Mary connects business insight with servant leadership, helping turn strategic opportunities into partnerships that support growth and greater reach.",
  },
  {
    name: "Monet Traslavina",
    role: "Young Professionals Board",
    company: "Director of Operations, Esther Grace Foundation",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    bio: "Monet represents the alumni voice, bringing operational knowledge and next-generation perspective to how Legacy Leaders invests in its future leaders.",
  },
];

const gala2025Images = [
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    alt: "Guests arriving at the 2025 gala",
    label: "Arrival",
    caption: "An opening hour designed for connection, mentorship, and community celebration before the main program begins.",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80",
    alt: "Audience listening during keynote moment",
    label: "Stories",
    caption: "Transformational testimonies and mission moments that remind supporters exactly why investment in leadership matters.",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    alt: "Celebratory gala stage moment",
    label: "Honoring impact",
    caption: "The evening recognizes leaders, partners, and alumni whose example continues to ripple outward into community change.",
  },
];

const gala2023Images = [
  {
    src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1400&q=80",
    alt: "Friends posing together at gala",
    label: "Community",
    caption: "A room full of mentors, professionals, donors, and fellows celebrating what happens when people choose to invest in each other.",
  },
  {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
    alt: "Networking and conversation during gala",
    label: "Connection",
    caption: "Every gala creates space for meaningful introductions, future collaborations, and new opportunities for emerging leaders.",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    alt: "Fundraising celebration at gala",
    label: "Momentum",
    caption: "The energy of the night translates into resources that fuel mentorship, leadership training, and life-changing experiences.",
  },
];

const boardMembersQuery = `*[_type == "boardMember"] | order(_createdAt asc) {
  _id,
  name,
  role,
  company,
  bio,
  image
}`;

export default async function OurStoryPage() {
  const boardMembers = await client.fetch(boardMembersQuery, {}, {
    cache: "no-store",
  });

  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-[#f6f1e8] px-6 pb-20 pt-36 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-white/40 lg:block" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative z-10">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Our Story</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter text-[#344059] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.92]">
                Developing leaders who shape what comes next.
              </h1>
              <p className="mt-8 max-w-2xl border-l-2 border-[#D89B2B] pl-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                Legacy Leaders equips youth and adults with the tools to develop their maximum potential and become purposeful leaders in their communities and beyond.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-none bg-[#344059] shadow-[0_24px_70px_rgba(52,64,89,0.18)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80"
                  alt="Legacy Leaders fellows celebrating together"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(52,64,89,0.05),rgba(52,64,89,0.75))]" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D89B2B]">Since 2010</p>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/90">
                  What started in Chicago as a commitment to mentoring youth has become a multi-stage leadership development community with local and global reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRESIDENT'S WELCOME */}
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-none border border-[#344059]/10 bg-[#f8f6f1] shadow-[0_24px_80px_rgba(52,64,89,0.05)]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[22rem] lg:min-h-full">
                <Image
                  src="/chief.webp"
                  alt="President and founder portrait placeholder"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(52,64,89,0.12),rgba(52,64,89,0.45))]" />
              </div>

              <div className="relative p-8 sm:p-12 lg:p-16">
                <Quote className="absolute left-8 top-8 h-12 w-12 text-[#D89B2B]/20 sm:left-12 sm:top-12 sm:h-16 sm:w-16" />
                <div className="relative z-10">
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">From the President</p>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">Welcome to Legacy Leaders</h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-gray-600 sm:text-lg">
                    <p>
                      Thank you for your interest in Legacy Leaders. Since 2010, we have been committed to helping individuals discover their potential, develop their leadership abilities, and create meaningful impact in their communities and beyond.
                    </p>
                    <p>
                      We believe leadership is not defined by a title. It is defined by influence. Through mentorship, leadership development, coaching, speaking engagements, workshops, and service opportunities, we help people build confidence, strengthen their skills, discover purpose, and pursue their goals with greater clarity.
                    </p>
                    <p>
                      None of this work happens alone. It takes mentors, donors, volunteers, alumni, and partners who are willing to invest in the next generation. Whether you want to grow as a leader, support the mission, or create opportunities for others, we invite you to join us in building a legacy that lasts.
                    </p>
                  </div>
                  <div className="mt-8 border-t border-[#344059]/10 pt-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#344059]">Leading for Change,</p>
                    <p className="mt-2 text-2xl font-black tracking-tight text-[#344059]">Everett Gutierrez Jr.</p>
                    <p className="text-sm uppercase tracking-[0.18em] text-gray-500">President &amp; Founder, Legacy Leaders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MISSION & VISION */}
        <section className="bg-[#344059] px-6 py-20 text-white sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Core Pillars</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:leading-[1.1]">
                A movement rooted in purpose.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10">
                <Users className="h-8 w-8 text-[#D89B2B]" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/65">Our Mission</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Equip youth and adults with the tools to develop their maximum potential and become purposeful leaders in their communities and beyond.
                </p>
              </div>
              <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10">
                <Sparkles className="h-8 w-8 text-[#D89B2B]" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/65">Our Vision</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Provide training and life-transforming experiences that create a ripple effect of world changers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HISTORY */}
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Our History</p>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">Built in Chicago. Growing beyond it.</h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Legacy Leaders has grown from youth mentoring into a multi-layered leadership development organization serving young people, emerging professionals, mentors, and global partners.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="space-y-6 text-base leading-8 text-gray-600 sm:text-lg">
                <p>
                  Since its inception in 2010, Legacy Leaders has been committed to developing the potential of individuals from Black and Brown communities by equipping them with the confidence, leadership skills, and support needed to pursue greater opportunities and create lasting change.
                </p>
                <p>
                  What began as a passion for mentoring and developing youth throughout Chicago grew into leadership programs, mentorship opportunities, and community-based experiences that empowered young people to overcome barriers, discover their strengths, and envision a brighter future.
                </p>
                <p>
                  As the impact expanded, so did the vision. Today, Legacy Leaders serves emerging leaders through a robust Young Adult Fellowship Program now entering its fifth cycle, connecting participants with mentors, leadership training, professional development opportunities, service experiences, and a network designed to help them thrive personally and professionally.
                </p>
                <p>
                  Through strategic partnerships and global outreach, Legacy Leaders also supports a children's home in South Africa, reflecting the belief that leadership, hope, and opportunity should never be limited by geography. At the center of it all is one conviction: every person carries untapped potential and the power to influence the world around them.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-none sm:col-span-2">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={historyImages[0].src}
                      alt={historyImages[0].alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                {historyImages.slice(1).map((image) => (
                  <div key={image.src} className="relative overflow-hidden rounded-none">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 20vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. FELLOWS */}
        <section className="bg-[#f8f6f1] px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Our Fellows</p>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">A grid of impact across each year.</h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Every cohort adds a new chapter to the Legacy Leaders story. These fellowship cycles represent a growing community of emerging leaders developing vision, discipline, and influence.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {fellowsByYear.map((fellow) => (
                <article key={fellow.label} className="overflow-hidden rounded-none border border-[#344059]/10 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={fellow.image}
                      alt={`${fellow.year} fellows`}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D89B2B]">{fellow.label}</p>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#344059]">{fellow.year}</h3>
                    <p className="text-sm font-semibold text-[#344059]">{fellow.title}</p>
                    <p className="text-sm leading-6 text-gray-600">{fellow.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LEADERSHIP (Combined Board, Advisory, YPB) */}
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#344059]/10 pb-12">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">The Leadership</p>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">Experience, imagination, and conviction.</h2>
              </div>
              <a
                href={applicationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#344059] transition-colors hover:text-[#D89B2B]"
              >
                Sign up to be a board member <ArrowRight size={16} />
              </a>
            </div>

            <div className="mb-24 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
              {boardMembers.map((member) => (
                <article key={member._id} className="group flex flex-col">
                  <div className="relative mb-6 overflow-hidden bg-[#e8ebf1] rounded-none">
                    <div className="relative aspect-[3/4] w-full">
                      {member.image ? (
                        <Image
                          src={urlFor(member.image).width(900).auto("format").url()}
                          alt={member.name}
                          fill
                          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 100vw"
                          className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                        />
                      ) : null}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059]">{member.name}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">{member.role}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-500">{member.company}</p>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{member.bio}</p>
                </article>
              ))}
            </div>

            {/* Sub-Boards */}
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10">
                <Globe2 className="h-8 w-8 text-[#D89B2B]" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059]">Legacy Advisory Board</p>
                <p className="mt-4 text-base leading-8 text-gray-600">
                  The Advisory Board is made up of experienced professionals, business leaders, and community advocates who provide specialized expertise, industry insight, and strategic counsel to strengthen the mission and expand organizational impact.
                </p>
                <a
                  href={applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B] transition-colors hover:text-[#344059]"
                >
                  Learn about advisory service <ArrowRight size={16} />
                </a>
              </article>

              <article className="rounded-none border border-[#344059]/10 bg-[#f8f6f1] p-8 sm:p-10">
                <Handshake className="h-8 w-8 text-[#D89B2B]" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-[#344059]">Young Professionals Board</p>
                <p className="mt-4 text-base leading-8 text-gray-600">
                  Made up of Legacy Leaders alumni who give back by supporting events, recruiting future fellows, fundraising, and bringing valuable insight into how the organization can continue to grow.
                </p>
                <a
                  href={applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#D89B2B] transition-colors hover:text-[#344059]"
                >
                  Apply to get involved <ArrowRight size={16} />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* 7. GALA */}
        <section className="bg-[#344059] px-6 py-20 text-white sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Legacy Sneaker Gala</p>
                <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">A celebration of purpose and possibility.</h2>
              </div>
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                The Legacy Sneaker Gala is the organization's signature biannual fundraising and celebration event, bringing together mentors, supporters, professionals, and emerging leaders for an evening of inspiration. More than a fundraiser, it is a reminder that leadership can be both authentic and accessible.
              </p>
            </div>

            <div className="space-y-20">
              <MediaCarousel
                title="2025 Sneaker Gala"
                description="The 2025 edition highlighted transformational stories, honored outstanding leaders and partners, and rallied support for the next chapter of youth and young adult leadership development."
                images={gala2025Images}
              />

              <MediaCarousel
                title="2023 Sneaker Gala"
                description="The 2023 celebration brought together alumni, board members, donors, and community champions to invest in mentorship, education, and leadership opportunities that leave a lasting legacy."
                images={gala2023Images}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
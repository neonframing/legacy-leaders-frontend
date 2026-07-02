import Image from "next/image";
import { ArrowRight, Quote, Sparkles, Users } from "lucide-react";

export const runtime = 'edge';

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import InteractiveBoardCards from "@/components/InteractiveBoardCards";
import FellowsCarousel from "@/components/FellowsCarousel";
import GalaCarousel from "@/components/GalaCarousel";
import { client, urlFor } from "@/lib/sanityClient";

// Simplified array for CSS Columns Masonry
const historyImages = [
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80",
    alt: "Legacy Leaders wide group session",
    aspect: "aspect-[16/9]", 
  },
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    alt: "Mentor leading a workshop",
    aspect: "aspect-[4/5]", 
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    alt: "Community event with young adults",
    aspect: "aspect-[4/3]", 
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    alt: "Professionals collaborating wide",
    aspect: "aspect-[16/9]", 
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "Leadership seminar",
    aspect: "aspect-[3/4]", 
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    alt: "Community outreach event",
    aspect: "aspect-[4/5]", 
  },
];

const fellowsByYear = [
  {
    label: "2021",
    title: "Foundations of confidence",
    description: "The first fellowship cohort centered identity, confidence, and career clarity for emerging leaders ready to take purposeful first steps.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
    individuals: [
      { name: "Marcus Johnson", role: "Software Engineer", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
      { name: "Elena Rodriguez", role: "Marketing Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { name: "David Chen", role: "Financial Analyst", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Sarah Williams", role: "Operations Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
      { name: "James Taylor", role: "Product Designer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
      { name: "Maya Patel", role: "Data Scientist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
      { name: "Isaiah Washington", role: "Policy Advisor", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
      { name: "Chloe Bennett", role: "HR Specialist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
      { name: "Lucas Mitchell", role: "Sales Executive", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
      { name: "Zoe Foster", role: "Creative Strategist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
      { name: "Julian Park", role: "Urban Planner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
      { name: "Aisha Jenkins", role: "Nonprofit Director", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
      { name: "Ryan Cooper", role: "Consultant", image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=400&q=80" },
      { name: "Mia Gomez", role: "Brand Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
      { name: "Nathan Wright", role: "Civil Engineer", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
      { name: "Grace Lee", role: "Clinical Researcher", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
      { name: "Elijah Brooks", role: "Communications Director", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" },
      { name: "Sofia Morales", role: "UX Researcher", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { name: "Caleb Hughes", role: "Logistics Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Ava Richardson", role: "Account Executive", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    label: "2022",
    title: "Mentorship in motion",
    description: "The second class deepened mentor relationships, leadership coaching, and accountability systems that helped fellows move from ideas to action.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    individuals: [
      { name: "Michael Chang", role: "Business Consultant", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
      { name: "Jessica Smith", role: "Healthcare Administrator", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
      { name: "Robert Wilson", role: "Nonprofit Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
      { name: "Amanda Lee", role: "Legal Associate", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
      { name: "Omar Tariq", role: "Financial Advisor", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
      { name: "Nadia Rossi", role: "Public Relations", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
      { name: "Trevor Evans", role: "Systems Engineer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
      { name: "Vanessa Cruz", role: "Educator", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
      { name: "Dominic Silva", role: "Real Estate Broker", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Priya Sharma", role: "Clinical Therapist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
      { name: "Leo Brooks", role: "Architect", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" },
      { name: "Carmen Reyes", role: "Community Organizer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { name: "Victor Nguyen", role: "Supply Chain Analyst", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
      { name: "Hannah Ward", role: "Digital Marketer", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
      { name: "Tyler Morgan", role: "Data Architect", image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=400&q=80" },
      { name: "Sienna Patel", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { name: "Jordan Cole", role: "Investment Analyst", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
      { name: "Alicia Kemp", role: "Content Director", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80" },
      { name: "Gavin Hayes", role: "Operations Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Nina Sullivan", role: "Policy Researcher", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    label: "2023",
    title: "Networks that open doors",
    description: "Professional exposure, community service, and peer connection expanded what fellows believed was possible for their families and futures.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    individuals: [
       { name: "Thomas Anderson", role: "Systems Architect", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
       { name: "Lisa Thompson", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
       { name: "Christopher Davis", role: "Investment Banker", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
       { name: "Maya Jackson", role: "Product Manager", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" },
       { name: "Ethan Scott", role: "UX Designer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
       { name: "Isabella Flores", role: "Biomedical Engineer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
       { name: "Alexander White", role: "Corporate Counsel", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
       { name: "Lily Chen", role: "Fundraising Manager", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
       { name: "Derek Mason", role: "Civil Servant", image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=400&q=80" },
       { name: "Samantha Reid", role: "Healthcare Consultant", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
       { name: "Wesley Reed", role: "Cybersecurity Analyst", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
       { name: "Zahra Khan", role: "Public Health Official", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
       { name: "Justin Baker", role: "Commercial Real Estate", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
       { name: "Tanya Woods", role: "Media Relations", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
       { name: "Gabriel Soto", role: "Data Scientist", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" },
       { name: "Megan Bailey", role: "Education Admin", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
       { name: "Devin Murphy", role: "Operations Analyst", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
       { name: "Audrey Foster", role: "Grant Writer", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
       { name: "Collin Gray", role: "Logistics Coordinator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
       { name: "Kiara Bennett", role: "Brand Strategist", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    label: "2024",
    title: "Leadership with strategy",
    description: "Participants sharpened practical leadership skills while building stronger career plans, community impact, and personal discipline.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    individuals: [
      { name: "Kevin Martinez", role: "Urban Planner", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
      { name: "Rachel Green", role: "Policy Analyst", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
      { name: "Daniel Kim", role: "Civil Engineer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
      { name: "Michelle Brown", role: "HR Executive", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
      { name: "Anthony White", role: "Sales Director", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
      { name: "Jasmine Kaur", role: "Art Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
      { name: "Brian Hughes", role: "Financial Planner", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
      { name: "Lauren Perez", role: "Clinical Pharmacist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { name: "Sean Simmons", role: "Tech Consultant", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Natalie Barnes", role: "Supply Chain Manager", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
      { name: "Aaron Foster", role: "Legislative Aide", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
      { name: "Chelsea Gomez", role: "Social Worker", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
      { name: "Eric Butler", role: "Software Developer", image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=400&q=80" },
      { name: "Victoria Price", role: "Digital Analyst", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
      { name: "Corey Howard", role: "Business Dev Manager", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" },
      { name: "Allison Brooks", role: "Compliance Officer", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { name: "Ian Cooper", role: "Investment Analyst", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
      { name: "Brooke Rogers", role: "Marketing Coordinator", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80" },
      { name: "Marcus Reed", role: "Operations Director", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
      { name: "Julia Bell", role: "Content Strategist", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    label: "2025",
    title: "The next legacy",
    description: "The newest cohort continues the flagship journey with mentorship, professional development, and transformational experiences for the next wave of leaders.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    individuals: [
      { name: "Sophia Carter", role: "Fellow", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
      { name: "Jackson Wright", role: "Fellow", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
      { name: "Olivia Scott", role: "Fellow", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
      { name: "William Harris", role: "Fellow", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
      { name: "Emma Nelson", role: "Fellow", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
      { name: "Liam King", role: "Fellow", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
      { name: "Charlotte Green", role: "Fellow", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { name: "Noah Adams", role: "Fellow", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
      { name: "Amelia Baker", role: "Fellow", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
      { name: "Lucas Gonzalez", role: "Fellow", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
      { name: "Harper Perez", role: "Fellow", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
      { name: "Oliver Roberts", role: "Fellow", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Evelyn Turner", role: "Fellow", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
      { name: "Benjamin Phillips", role: "Fellow", image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=400&q=80" },
      { name: "Abigail Campbell", role: "Fellow", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { name: "Henry Parker", role: "Fellow", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" },
      { name: "Emily Evans", role: "Fellow", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80" },
      { name: "Alexander Edwards", role: "Fellow", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
      { name: "Elizabeth Collins", role: "Fellow", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" },
      { name: "Sebastian Stewart", role: "Fellow", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
    ]
  },
];

// Grouped for the new Gala Component
const galaEditions = [
  {
    year: "2025",
    images: [
      {
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
        alt: "Guests arriving at the 2025 gala",
        label: "Arrival",
        caption: "An opening hour designed for connection, mentorship, and community celebration.",
      },
      {
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80",
        alt: "Audience listening during keynote moment",
        label: "Stories",
        caption: "Transformational testimonies that remind supporters why investment matters.",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
        alt: "Celebratory gala stage moment",
        label: "Honoring impact",
        caption: "Recognizing leaders and partners whose example ripples outward.",
      },
    ]
  },
  {
    year: "2023",
    images: [
      {
        src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1400&q=80",
        alt: "Friends posing together at gala",
        label: "Community",
        caption: "A room full of mentors and fellows celebrating investment in each other.",
      },
      {
        src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
        alt: "Networking and conversation during gala",
        label: "Connection",
        caption: "Every gala creates space for meaningful introductions and future collaborations.",
      },
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
        alt: "Fundraising celebration at gala",
        label: "Momentum",
        caption: "Translating the energy of the night into resources that fuel mentorship.",
      },
    ]
  }
];

// Fetches all board members sorted by their manual drag-and-drop position
const boardMembersQuery = `*[_type == "boardMember"] | order(orderRank) {
  _id,
  name,
  role,
  company,
  bio,
  "imageUrl": image.asset->url
}`;

export default async function OurStoryPage() {
  // Fetch the ordered array directly from Sanity
  const boardMembers = await client.fetch(boardMembersQuery, {}, {
    cache: "no-store",
  }) || []; // Fallback to empty array if nothing is returned

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

        {/* 2. MISSION & VISION */}
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

        {/* 3. HISTORY (Sticky Text + CSS Columns Masonry) */}
        <section id="our-history" className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            {/* FIX 1: Change lg:items-start to lg:items-center to vertically center the row */}
            <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
              
              {/* FIX 2: Add self-start here so the text still pins to the top of the screen when scrolling */}
              <div className="w-full lg:w-[45%] lg:sticky lg:top-32 self-start space-y-8 flex-shrink-0">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Our History</p>
                  <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">
                    Built in Chicago.<br />Growing beyond it.
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-gray-600 lg:pr-6">
                  <p>
                    Since its inception in 2010, Legacy Leaders has been committed to developing the potential of individuals from Black and Brown communities by equipping them with the confidence, leadership skills, and support needed to pursue greater opportunities and create lasting change.
                  </p>
                  <p>
                    What began as a passion for mentoring and developing youth throughout the city of Chicago has grown into a multifaceted leadership development organization impacting individuals across multiple stages of life. In our early years, Legacy Leaders focused on creating youth leadership programs, mentorship opportunities, and community-based experiences that empowered young people to overcome barriers, discover their strengths, and envision a brighter future.
                  </p>
                  <p>
                    As our impact expanded, so did our vision. Today, Legacy Leaders serves emerging leaders through a robust Young Adult Fellowship Program, now entering its fifth program cycle. This flagship initiative connects young adults with mentors, leadership training, professional development opportunities, community service experiences, and a network of support designed to help them thrive personally and professionally. Through this program, participants gain the tools, confidence, and relationships needed to become influential leaders within their families, workplaces, and communities.
                  </p>
                  <p>
                    Our commitment to leadership development extends beyond our local communities. Through strategic partnerships and global outreach efforts, Legacy Leaders also supports a children's home in South Africa, providing resources, encouragement, and opportunities that help young people flourish despite challenging circumstances. This international partnership reflects our belief that leadership, hope, and opportunity should know no geographic boundaries.
                  </p>
                  <p>
                    At the heart of everything we do is the belief that every individual possesses untapped potential and the ability to positively influence the world around them. Through mentorship, leadership development, coaching, service-learning experiences, and collaborative partnerships, Legacy Leaders helps individuals identify their strengths, overcome obstacles, and transform their futures.
                  </p>
                  <p className="font-bold text-[#344059]">
                    More than a leadership organization, Legacy Leaders is a community dedicated to raising up the next generation of purpose-driven leaders who will create meaningful impact in their families, organizations, neighborhoods, and beyond.
                  </p>
                </div>
              </div>

              {/* Masonry Image Column */}
              <div className="w-full lg:w-[55%]">
                <div className="columns-1 sm:columns-2 gap-6 space-y-6">
                  {historyImages.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-none w-full bg-gray-100 break-inside-avoid ${image.aspect}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. FELLOWS (Replaced with PC-Accessible Carousel) */}
        <section className="bg-[#f8f6f1] pt-20 pb-10 sm:pt-24 lg:pt-28 lg:pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Our Fellows</p>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">A timeline of impact.</h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Every cohort adds a new chapter to the Legacy Leaders story. Scroll through our fellowship cycles to see a growing community of emerging leaders.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[1400px]">
            <FellowsCarousel fellows={fellowsByYear} />
          </div>
        </section>

        {/* 5. LEADERSHIP */}
        <section id="leadership" className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#344059]/10 pb-12">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">The Leadership</p>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#344059] sm:text-5xl">Experience, imagination, and conviction.</h2>
              </div>
              <a
                href="#"
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
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
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
                  <p className="mt-4 text-sm leading-7 text-gray-600 whitespace-pre-wrap">{member.bio}</p>
                </article>
              ))}
            </div>

            {/* Sub-Boards Interactive Component */}
            <InteractiveBoardCards />
          </div>
        </section>

        {/* 6. PRESIDENT'S WELCOME */}
        <section className="bg-white px-6 pb-20 sm:pb-24 lg:px-12 lg:pb-28">
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

        {/* 7. GALA (Replaced with Dynamic Carousel) */}
        <section id='sneaker-gala' className="bg-[#344059] px-6 py-20 text-white sm:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Legacy Sneaker Gala</p>
                <h2 className="text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-[5.5rem] md:leading-[0.9]">
                  A celebration <br />of purpose.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-white/80 max-w-lg md:ml-auto">
                Our signature biannual event brings together mentors, supporters, and emerging leaders for an evening of inspiration. More than a fundraiser, it is a reminder that leadership can be both authentic and accessible.
              </p>
            </div>

            <GalaCarousel editions={galaEditions} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
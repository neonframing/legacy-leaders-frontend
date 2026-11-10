import { PrivateBlogIndex } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export const metadata = { title: "Mentors Blog | Legacy Leaders" };

export default function MentorsBlogPage() {
  return <PrivateBlogIndex audience="mentor" />;
}

import { PrivateBlogIndex } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export const metadata = { title: "Fellows Blog | Legacy Leaders" };

export default function FellowsBlogPage() {
  return <PrivateBlogIndex audience="fellow" />;
}

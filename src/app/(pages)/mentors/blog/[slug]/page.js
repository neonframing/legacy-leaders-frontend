import { PrivateBlogPost } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export default function MentorsBlogPostPage({ params }) {
  return <PrivateBlogPost audience="mentor" params={params} />;
}

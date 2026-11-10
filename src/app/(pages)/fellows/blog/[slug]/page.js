import { PrivateBlogPost } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export default function FellowsBlogPostPage({ params }) {
  return <PrivateBlogPost audience="fellow" params={params} />;
}

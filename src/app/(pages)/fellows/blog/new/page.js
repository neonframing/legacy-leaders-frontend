import { PrivateBlogNew } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export const metadata = { title: "New Post | Fellows Blog" };

export default function FellowsNewPostPage() {
  return <PrivateBlogNew audience="fellow" />;
}

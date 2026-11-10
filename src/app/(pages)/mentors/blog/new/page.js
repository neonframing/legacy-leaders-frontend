import { PrivateBlogNew } from "@/components/blog/PrivateBlogPages";

export const runtime = 'edge';

export const metadata = { title: "New Post | Mentors Blog" };

export default function MentorsNewPostPage() {
  return <PrivateBlogNew audience="mentor" />;
}

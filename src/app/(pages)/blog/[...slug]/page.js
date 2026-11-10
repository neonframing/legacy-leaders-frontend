import { notFound } from "next/navigation";
import BlogPost, { postMetadata } from "@/components/routes/BlogPost";
import BlogNew, { blogNewMetadata } from "@/components/routes/BlogNew";
import ProfileView, { profileMetadata } from "@/components/routes/ProfileView";
import ProfileEdit, { profileEditMetadata } from "@/components/routes/ProfileEdit";

// Handles every /blog/* page in one edge function to stay under Cloudflare's bundle limit.
export const runtime = 'edge';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug.length === 1) return slug[0] === "new" ? blogNewMetadata : postMetadata(slug[0]);
  if (slug[0] === "profile" && slug.length === 2) {
    return slug[1] === "edit" ? profileEditMetadata : profileMetadata(slug[1]);
  }
  return {};
}

export default async function BlogRoute({ params }) {
  const { slug } = await params;
  if (slug.length === 1) return slug[0] === "new" ? <BlogNew /> : <BlogPost slug={slug[0]} />;
  if (slug[0] === "profile" && slug.length === 2) {
    return slug[1] === "edit" ? <ProfileEdit /> : <ProfileView username={slug[1]} />;
  }
  notFound();
}

import { notFound } from "next/navigation";
import BlogIndex, { blogIndexMetadata } from "@/components/routes/BlogIndex";
import BlogPost, { postMetadata } from "@/components/routes/BlogPost";
import BlogNew, { blogNewMetadata } from "@/components/routes/BlogNew";
import ProfileView, { profileMetadata } from "@/components/routes/ProfileView";
import ProfileEdit, { profileEditMetadata } from "@/components/routes/ProfileEdit";

// One catch-all route keeps the Cloudflare bundle to a single edge function for all /blog pages.
export const runtime = 'edge';

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  if (slug.length === 0) return blogIndexMetadata;
  if (slug.length === 1 && slug[0] === "new") return blogNewMetadata;
  if (slug.length === 1) return postMetadata(slug[0]);
  if (slug[0] === "profile" && slug.length === 2) {
    return slug[1] === "edit" ? profileEditMetadata : profileMetadata(slug[1]);
  }
  return {};
}

export default async function BlogRoute({ params }) {
  const { slug = [] } = await params;
  if (slug.length === 0) return <BlogIndex />;
  if (slug.length === 1) return slug[0] === "new" ? <BlogNew /> : <BlogPost slug={slug[0]} />;
  if (slug[0] === "profile" && slug.length === 2) {
    return slug[1] === "edit" ? <ProfileEdit /> : <ProfileView username={slug[1]} />;
  }
  notFound();
}

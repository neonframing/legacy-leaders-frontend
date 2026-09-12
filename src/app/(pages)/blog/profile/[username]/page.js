import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/blog/PostCard";
import SocialLinks from "@/components/blog/SocialLinks";
import { supabasePublic } from "@/lib/supabaseClient";

export const runtime = 'edge';

export async function generateMetadata({ params }) {
  const { username } = await params;
  const { data: profile } = await supabasePublic
    .from("profiles")
    .select("display_name")
    .eq("username", username)
    .single();

  return { title: profile ? `${profile.display_name} | Legacy Leaders Blog` : "Legacy Leaders Blog" };
}

export default async function BlogProfilePage({ params }) {
  const { username } = await params;

  const { data: profile } = await supabasePublic
    .from("profiles")
    .select("id, username, display_name, role, bio, avatar_url, socials")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: posts } = await supabasePublic
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, created_at")
    .eq("author_id", profile.id)
    .order("created_at", { ascending: false });

  const socials = profile.socials ?? {};
  const postsWithProfile = (posts ?? []).map((post) => ({ ...post, profiles: profile }));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-40">
        <div className="flex items-center gap-4">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.display_name}
              className="h-20 w-20 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-[#344059]">{profile.display_name}</h1>
            <p className="text-xs uppercase tracking-wider text-[#667085] capitalize">{profile.role}</p>
          </div>
        </div>

        {profile.bio && <p className="mt-6 text-[#344059]">{profile.bio}</p>}

        <SocialLinks socials={socials} />

        <h2 className="mt-12 text-xl font-bold text-[#344059]">Posts</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {postsWithProfile.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {postsWithProfile.length === 0 && <p className="text-[#667085]">No posts yet.</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

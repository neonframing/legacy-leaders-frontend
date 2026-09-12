import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/blog/PostCard";
import { supabasePublic } from "@/lib/supabaseClient";

export const runtime = 'edge';

export const metadata = {
  title: "Blog | Legacy Leaders",
  description: "Stories, updates, and reflections from Legacy Leaders Fellows and Mentors.",
};

export default async function BlogPage() {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, created_at, profiles(display_name, avatar_url, role)")
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#344059]">Fellows &amp; Mentors Blog</h1>
            <p className="mt-2 text-[#667085]">Stories, wins, and lessons from our community.</p>
          </div>
          <div className="flex items-center gap-4">
            <Show when="signed-in">
              <Link
                href="/blog/profile/edit"
                className="border border-[#344059] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#344059] transition-all hover:bg-[#344059] hover:text-white"
              >
                Edit Profile
              </Link>
              <Link
                href="/blog/new"
                className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B]"
              >
                New Post
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonPopoverActionButton__manageAccount: { display: "none" },
                  },
                }}
              />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="border border-[#344059] bg-[#344059] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#344059]">
                  Sign In to Post
                </button>
              </SignInButton>
            </Show>
          </div>
        </div>

        {error && <p className="mt-10 text-red-600">Unable to load posts. Please try again later.</p>}

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {posts?.length === 0 && (
            <p className="text-[#667085]">No posts yet. Be the first to share something!</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

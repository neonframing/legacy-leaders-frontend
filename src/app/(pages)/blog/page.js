import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/blog/PostCard";
import GoogleCalendar from "@/components/GoogleCalendar";
import { supabasePublic } from "@/lib/supabaseClient";

export const runtime = 'edge';

export const metadata = {
  title: "Events & Blog | Legacy Leaders",
  description: "Upcoming events, stories, updates, and reflections from Legacy Leaders Fellows and Mentors.",
};

export default async function BlogPage() {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, created_at, profiles(display_name, avatar_url, role)")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
        {/* Google Calendar Section */}
        <section className="mb-16 lg:mb-20">
          <GoogleCalendar />
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12" />

        {/* Fellows & Mentors Blog Section */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-[#D89B2B]"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">
                  Community Voices
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">
                Fellows &amp; Mentors Blog
              </h2>
              <p className="mt-2 text-base text-gray-600 leading-relaxed">
                Stories, wins, and lessons from our community.
              </p>
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
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostForm from "@/components/blog/PostForm";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const metadata = {
  title: "New Post | Legacy Leaders Blog",
};

export default async function NewBlogPostPage() {
  const { userId } = await auth.protect();

  const supabase = createClerkSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) redirect("/blog/profile/edit");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-40">
        <h1 className="text-3xl font-bold text-[#344059]">Write a New Post</h1>
        <p className="mt-2 text-[#667085]">Share an update, a win, or something helpful with the community.</p>
        <div className="mt-10">
          <PostForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

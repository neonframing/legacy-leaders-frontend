import { auth } from "@clerk/nextjs/server";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProfileForm from "@/components/blog/ProfileForm";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const runtime = 'edge';

export const metadata = {
  title: "Edit Profile | Legacy Leaders Blog",
};

export default async function EditBlogProfilePage() {
  const { userId } = await auth.protect();
  const supabase = createClerkSupabaseServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, role, bio, avatar_url, socials")
    .eq("clerk_user_id", userId)
    .single();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-40">
        <h1 className="text-3xl font-bold text-[#344059]">
          {profile ? "Edit Your Profile" : "Set Up Your Blog Profile"}
        </h1>
        <p className="mt-2 text-[#667085]">Add your bio and socials so readers can connect with you.</p>
        <div className="mt-10">
          <ProfileForm initialProfile={profile} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

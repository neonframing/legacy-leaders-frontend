import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClassPageContent from "@/components/ClassPageContent";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

// Shared server page for /fellows and /mentors. `audience` is "fellow" or "mentor".
export default async function ClassUpdatesPage({ audience, heading }) {
  const { userId } = await auth.protect();
  const supabase = createClerkSupabaseServerClient();

  const [{ data: admin }, { data: profile }] = await Promise.all([
    supabase.from("admins").select("clerk_user_id").eq("clerk_user_id", userId).maybeSingle(),
    supabase.from("profiles").select("role").eq("clerk_user_id", userId).maybeSingle(),
  ]);

  const isAdmin = Boolean(admin);
  if (!isAdmin && !profile) redirect("/blog/profile/edit");
  const allowed = isAdmin || profile?.role === audience;

  let items = [];
  if (allowed) {
    const { data } = await supabase
      .from("class_updates")
      .select("id, kind, title, content, event_date, created_at")
      .eq("audience", audience)
      .order("created_at", { ascending: false });
    items = data ?? [];
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-24 sm:px-6 lg:pb-24 lg:pt-36">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">{heading}</h1>
        {!allowed ? (
          <p className="mt-6 text-[#667085]">
            This page is only available to {audience}s. You can change your role in your{" "}
            <a href="/blog/profile/edit" className="underline">profile</a>.
          </p>
        ) : (
          <>
            <p className="mt-2 text-[#667085]">Itinerary and updates from the Legacy Leaders team.</p>
            <ClassPageContent
              audience={audience}
              items={items}
              isAdmin={isAdmin}
              today={new Date().toISOString().slice(0, 10)}
            />
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

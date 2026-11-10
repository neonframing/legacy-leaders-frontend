import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { UpdateForm, DeleteUpdateButton } from "@/components/UpdateAdminControls";
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

  let updates = [];
  if (allowed) {
    const { data } = await supabase
      .from("class_updates")
      .select("id, title, content, created_at")
      .eq("audience", audience)
      .order("created_at", { ascending: false });
    updates = data ?? [];
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">{heading}</h1>
        {!allowed ? (
          <p className="mt-6 text-[#667085]">This page is only available to {audience}s.</p>
        ) : (
          <>
            <p className="mt-2 text-[#667085]">Class updates and announcements from the Legacy Leaders team.</p>
            {isAdmin && (
              <div className="mt-8">
                <UpdateForm audience={audience} />
              </div>
            )}
            <div className="mt-10 space-y-6">
              {updates.map((u) => (
                <article key={u.id} className="border border-[#e7dfce] bg-[#fffdf8] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold">{u.title}</h2>
                    {isAdmin && <DeleteUpdateButton id={u.id} />}
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#667085]">
                    {new Date(u.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{u.content}</p>
                </article>
              ))}
              {updates.length === 0 && <p className="text-[#667085]">No updates yet.</p>}
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const blogBasePath = (audience) => (audience === "fellow" ? "/fellows/blog" : "/mentors/blog");

// Resolves the signed-in user's access to a private audience blog ("fellow" or "mentor").
export async function getClassAccess(audience) {
  const { userId } = await auth.protect();
  const supabase = createClerkSupabaseServerClient();

  const [{ data: admin }, { data: profile }] = await Promise.all([
    supabase.from("admins").select("clerk_user_id").eq("clerk_user_id", userId).maybeSingle(),
    supabase.from("profiles").select("id, role").eq("clerk_user_id", userId).maybeSingle(),
  ]);

  const isAdmin = Boolean(admin);
  if (!isAdmin && !profile) redirect("/blog/profile/edit");

  return { supabase, isAdmin, allowed: isAdmin || profile?.role === audience };
}

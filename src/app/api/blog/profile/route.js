import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const runtime = 'edge';

// Creates or updates the signed-in user's blog profile (bio, socials, role, etc).
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const body = await request.json();
    const { username, displayName, role, bio, avatarUrl, socials } = body;

    if (!username || !displayName || !role) {
      return NextResponse.json(
        { error: "username, displayName, and role are required." },
        { status: 400 }
      );
    }

    if (!["fellow", "mentor"].includes(role)) {
      return NextResponse.json({ error: "role must be 'fellow' or 'mentor'." }, { status: 400 });
    }

    const user = await currentUser();
    const supabase = createClerkSupabaseServerClient();

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          clerk_user_id: userId,
          username,
          display_name: displayName,
          role,
          bio: bio ?? null,
          avatar_url: avatarUrl || user?.imageUrl || null,
          socials: socials ?? {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: "clerk_user_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Profile upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ profile: data }, { status: 200 });
  } catch (error) {
    console.error("Profile submission error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

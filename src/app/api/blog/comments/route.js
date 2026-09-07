import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

// Adds a comment authored by the signed-in user to a post.
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content) {
      return NextResponse.json({ error: "postId and content are required." }, { status: 400 });
    }

    const supabase = createClerkSupabaseServerClient();

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Please set up your blog profile before commenting." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: postId, author_id: profile.id, content })
      .select("id, content, created_at, profiles(display_name)")
      .single();

    if (error) {
      console.error("Comment creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ comment: data }, { status: 200 });
  } catch (error) {
    console.error("Comment submission error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

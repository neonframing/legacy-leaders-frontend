import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Creates a new blog post authored by the signed-in user.
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, coverImageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required." }, { status: 400 });
    }

    const supabase = createClerkSupabaseServerClient();

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Please set up your blog profile before posting." },
        { status: 400 }
      );
    }

    const slug = `${slugify(title)}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        author_id: profile.id,
        title,
        slug,
        excerpt: excerpt ?? null,
        content,
        cover_image_url: coverImageUrl || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Post creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ post: data }, { status: 200 });
  } catch (error) {
    console.error("Post submission error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

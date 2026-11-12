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
    const { title, content, excerpt, coverImageUrl, audience = null } = body;

    if (audience !== null && audience !== "fellow" && audience !== "mentor") {
      return NextResponse.json({ error: "Invalid audience." }, { status: 400 });
    }

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
        audience,
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

// Row Level Security allows this only for the post's author or an admin.
export async function DELETE(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const supabase = createClerkSupabaseServerClient();
    const { data, error } = await supabase.from("posts").delete().eq("id", id).select("id");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (!data?.length) {
      return NextResponse.json({ error: "Not allowed." }, { status: 403 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Post delete error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

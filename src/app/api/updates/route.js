import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const runtime = 'edge';

const AUDIENCES = ["fellow", "mentor"];

// Admin check; RLS on class_updates also enforces this.
async function requireAdmin(supabase, userId) {
  const { data } = await supabase
    .from("admins")
    .select("clerk_user_id")
    .eq("clerk_user_id", userId)
    .maybeSingle();
  return Boolean(data);
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const supabase = createClerkSupabaseServerClient();
    if (!(await requireAdmin(supabase, userId))) {
      return NextResponse.json({ error: "Admins only." }, { status: 403 });
    }

    const { audience, title, content } = await request.json();
    if (!AUDIENCES.includes(audience) || !title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "audience, title and content are required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("class_updates")
      .insert({ audience, title: title.trim(), content: content.trim() })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ update: data }, { status: 200 });
  } catch (error) {
    console.error("Class update error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const supabase = createClerkSupabaseServerClient();
    if (!(await requireAdmin(supabase, userId))) {
      return NextResponse.json({ error: "Admins only." }, { status: 403 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const { error } = await supabase.from("class_updates").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Class update delete error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

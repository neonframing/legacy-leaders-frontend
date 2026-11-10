import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseServerClient } from "@/lib/supabaseClient";

export const runtime = 'edge';

const AUDIENCES = ["fellow", "mentor"];
const KINDS = ["update", "itinerary"];

// Row Level Security restricts both handlers to admins; a non-admin write affects no rows or errors.
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const { audience, kind = "update", title, content, eventDate } = await request.json();
    if (!AUDIENCES.includes(audience) || !KINDS.includes(kind) || !title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "audience, kind, title and content are required." }, { status: 400 });
    }
    if (kind === "itinerary" && !eventDate) {
      return NextResponse.json({ error: "Itinerary items need a date." }, { status: 400 });
    }

    const supabase = createClerkSupabaseServerClient();
    const { data, error } = await supabase
      .from("class_updates")
      .insert({
        audience,
        kind,
        title: title.trim(),
        content: content.trim(),
        event_date: kind === "itinerary" ? eventDate : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Admins only." }, { status: 403 });
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

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const supabase = createClerkSupabaseServerClient();
    const { data, error } = await supabase.from("class_updates").delete().eq("id", id).select("id");
    if (error || !data?.length) {
      return NextResponse.json({ error: "Not allowed." }, { status: 403 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Class update delete error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

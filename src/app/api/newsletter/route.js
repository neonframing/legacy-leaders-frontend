import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const GIVEBUTTER_API_KEY = process.env.GIVEBUTTER_API_KEY;

    if (!GIVEBUTTER_API_KEY) {
      console.error("Missing GIVEBUTTER_API_KEY environment variable");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Call the Givebutter Contacts API endpoint
    // Givebutter requires first_name, last_name, and primary_email (not "email")
    const response = await fetch("https://api.givebutter.com/v1/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GIVEBUTTER_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: "Newsletter",
        last_name: "Subscriber",
        primary_email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Givebutter API Rejection:", JSON.stringify(errorData));
      return NextResponse.json(
        { error: errorData.message || "Failed to add email to Givebutter." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Newsletter submission error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
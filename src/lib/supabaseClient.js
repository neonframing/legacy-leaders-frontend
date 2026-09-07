import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Public, unauthenticated client — safe for reading published posts/comments/profiles.
export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Server-only client that forwards the signed-in Clerk user's token so Supabase
// Row Level Security policies can identify the request as coming from that user.
// Requires the Clerk integration to be enabled under Supabase > Authentication > Sign In / Providers.
export function createClerkSupabaseServerClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    async accessToken() {
      const { getToken } = await auth();
      return (await getToken()) ?? null;
    },
  });
}

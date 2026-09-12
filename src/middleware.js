import { clerkMiddleware } from "@clerk/nextjs/server";

// Auth checks live on each protected resource (see /blog/new, /blog/profile/edit, and the API routes).
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};

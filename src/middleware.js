import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/blog/new(.*)",
  "/blog/profile/edit(.*)",
  "/api/blog(.*)",
  "/api/updates(.*)",
  "/fellows(.*)",
  "/mentors(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/blog",
    "/blog/new(.*)",
    "/blog/profile/edit(.*)",
    "/fellows(.*)",
    "/mentors(.*)",
    "/api/(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
};

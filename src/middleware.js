import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/blog/new(.*)",
  "/blog/profile/edit(.*)",
  "/api/blog(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/blog/new(.*)",
    "/blog/profile/edit(.*)",
    "/api/(.*)",
    "/sign-in/(.*)",
    "/sign-up/(.*)",
  ],
};

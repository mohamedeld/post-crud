import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  return (async () => {
    const authObject = await auth();

    if (isProtectRoute(req)) {
      if (!authObject.userId) {
        authObject.redirectToSignIn();
      }
    }
  })();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

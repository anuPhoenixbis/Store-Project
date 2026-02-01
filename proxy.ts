import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// these routes will be available even without signup
const isPublicRoute = createRouteMatcher(['/','/products(.*)','/about'])

export default clerkMiddleware(async (auth,req)=>{
    if(!isPublicRoute(req)) await auth.protect()//if not the public route then protect via auth ,that is, can't access those routes without signin
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
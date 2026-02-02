import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { toast } from 'sonner';

// these routes will be available even without signup
const isPublicRoute = createRouteMatcher(['/','/products(.*)','/about'])
const isAdminRoute = createRouteMatcher(['/admin(.*)']);


export default clerkMiddleware(async (auth,req)=>{
  // console.log((await auth()).userId) //logs the userId of the current user
  // we will use this assign certain profiles as admin
  const isAdminUser = (await auth()).userId === process.env.ADMIN_USER
  if(isAdminRoute(req) && !isAdminUser){
    return NextResponse.redirect(new URL('/',req.url))//if somehow accessed the admin route and is not an admin user then
    // redirect back to home
  }

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
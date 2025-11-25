import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
  
  // Ajouter des headers de performance et sécurité
  const response = NextResponse.next()
  const headers = response.headers
  
  // Cache headers pour les assets statiques
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Cache headers pour les images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/)) {
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  }
  
  // Headers de sécurité
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-XSS-Protection', '1; mode=block')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy pour réduire les API inutiles
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  
  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

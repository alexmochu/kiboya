// middleware.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoggedIn = !!req.auth?.user

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}

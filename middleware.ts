// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isAuth = !!token;
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (!isAuth && isDashboard) {
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }

  return NextResponse.next();
}

// 👇 Add this config object below the middleware function
export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to all routes under /dashboard
};

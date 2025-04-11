import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server'; // Removed TypeScript type import
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-at-least-32-characters';

// Routes that require authentication
const protectedRoutes = [
  '/personalized',
  '/profile'
];

// Removed TypeScript type annotation from request parameter
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get the token from the cookies
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login page if no token
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Verify token (will throw error if invalid)
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/personalized/:path*',
    '/profile/:path*',
  ],
}; 
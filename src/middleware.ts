import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if it's an admin route
    if (pathname.startsWith('/admin')) {
        // Check for auth cookie
        const authCookie = request.cookies.get('admin_auth');

        if (!authCookie || authCookie.value !== 'authenticated') {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // If already authenticated and trying to access login, redirect to admin
    if (pathname === '/login') {
        const authCookie = request.cookies.get('admin_auth');

        if (authCookie && authCookie.value === 'authenticated') {
            return NextResponse.redirect(new URL('/admin/products', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};

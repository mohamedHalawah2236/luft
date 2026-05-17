import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { AuthUserApiResponse } from './types/auth';

/** Deletes all auth cookies from a response (used on forced sign-out). */
function clearSessionCookies(response: NextResponse) {
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('accessTokenExpiresAt');
  response.cookies.delete('refreshTokenExpiresAt');
  response.cookies.delete('user');
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const targetRoute = pathname.split('/').slice(2).join('/');
  const locale = pathname.split('/')[1] || 'en';

  // Read auth state directly from request cookies (Edge Runtime safe).
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const accessExpired = !accessToken;

  const refreshExpired = !refreshToken;

  // A user is authenticated if they have a non-expired refresh token
  // (or a successful refresh just happened).
  let isAuth = !!(accessToken || refreshToken);

  const authRoutes = ['login', 'signup', 'forget-password'];
  const isAuthRoute = authRoutes.some((route) => targetRoute.startsWith(route));

  const protectedRoutes = ['account/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    targetRoute.startsWith(route),
  );

  let freshData: AuthUserApiResponse;
  let refreshSetCookies: string[] = [];

  // Attempt to refresh if: access token is expired but refresh token is still valid.
  if (accessExpired && !refreshExpired && refreshToken) {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify({ refreshToken }),
    });

    console.log('responseeeeeeeeeeeeeeeeeeeee');

    freshData = await response.json();
    console.log(freshData);

    if (response.ok) {
      // Capture the Set-Cookie headers from the internal Route Handler
      refreshSetCookies = response.headers.getSetCookie();
    } else {
      isAuth = false;
    }
  }

  // Authenticated user visiting an auth page → redirect to home.
  if (isAuth && isAuthRoute) {
    const response = NextResponse.redirect(new URL('/', request.url));
    refreshSetCookies.forEach((cookie) => response.headers.append('Set-Cookie', cookie));
    return response;
  }

  // Unauthenticated user visiting a protected page → redirect to login.
  if (!isAuth && isProtectedRoute) {
    const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    clearSessionCookies(response);
    return response;
  }

  // Normal navigation — let next-intl handle it, attach fresh cookies if refreshed.
  const response = createMiddleware(routing)(request);

  if (refreshSetCookies.length > 0) {
    refreshSetCookies.forEach((cookie) => response.headers.append('Set-Cookie', cookie));
  } else if (!isAuth && refreshToken) {
    // If the token refresh failed entirely, ensure we clear the dead session cookies 
    // even if they were visiting a public un-protected route.
    clearSessionCookies(response);
  }

  return response;
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static assets
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)',
  ],
};

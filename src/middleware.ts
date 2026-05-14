import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { AuthUserApiResponse } from './types/auth';

// Must match the options used when setting cookies in actions / session utils.
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/**
 * Calls the backend refresh-token endpoint from within the Edge Runtime.
 * Cannot use next/headers here — cookies must be read from the request
 * and written onto the NextResponse.
 */
async function tryRefreshInMiddleware(
  refreshToken: string,
): Promise<AuthUserApiResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.result ?? json;
  } catch {
    return null;
  }
}

/** Stamps the refreshed tokens onto any NextResponse. */
function setRefreshedCookies(
  response: NextResponse,
  data: AuthUserApiResponse,
) {
  const accessExpiry = new Date(data.accessTokenExpiresAt);
  const refreshExpiry = new Date(data.refreshTokenExpiresAt);
  const userData = {
    id: data.userId,
    email: data.email,
    phoneNumber: data.phone,
    name: data.fullName,
    profilePicture: data.profilePicture,
  };

  response.cookies.set('accessToken', data.accessToken, {
    ...COOKIE_OPTIONS,
    expires: accessExpiry,
  });
  response.cookies.set('refreshToken', data.refreshToken, {
    ...COOKIE_OPTIONS,
    expires: refreshExpiry,
  });
  response.cookies.set(
    'accessTokenExpiresAt',
    data.accessTokenExpiresAt,
    COOKIE_OPTIONS,
  );
  response.cookies.set(
    'refreshTokenExpiresAt',
    data.refreshTokenExpiresAt,
    COOKIE_OPTIONS,
  );
  response.cookies.set('user', JSON.stringify(userData), COOKIE_OPTIONS);
}

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
  const accessTokenExpiresAtRaw = request.cookies.get('accessTokenExpiresAt')?.value;
  const refreshTokenExpiresAtRaw = request.cookies.get('refreshTokenExpiresAt')?.value;

  const accessExpired = accessTokenExpiresAtRaw
    ? Date.now() >= new Date(accessTokenExpiresAtRaw).getTime()
    : !accessToken; // treat missing as expired

  const refreshExpired = refreshTokenExpiresAtRaw
    ? Date.now() >= new Date(refreshTokenExpiresAtRaw).getTime()
    : !refreshToken;

  // Attempt to refresh if: access token is expired but refresh token is still valid.
  let freshData: AuthUserApiResponse | null = null;
  if (accessExpired && !refreshExpired && refreshToken) {
    freshData = await tryRefreshInMiddleware(refreshToken);
  }

  // A user is authenticated if they have a non-expired refresh token
  // (or a successful refresh just happened).
  const isAuth = freshData !== null || (!refreshExpired && !!refreshToken) || (!accessExpired && !!accessToken);

  const authRoutes = ['login', 'signup', 'forget-password'];
  const isAuthRoute = authRoutes.some((route) => targetRoute.startsWith(route));

  const protectedRoutes = ['account/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    targetRoute.startsWith(route),
  );

  // Authenticated user visiting an auth page → redirect to home.
  if (isAuth && isAuthRoute) {
    const response = NextResponse.redirect(new URL('/', request.url));
    if (freshData) setRefreshedCookies(response, freshData);
    return response;
  }

  // Unauthenticated user visiting a protected page → redirect to login.
  if (!isAuth && isProtectedRoute) {
    const response = NextResponse.redirect(
      new URL(`/${locale}/login`, request.url),
    );
    clearSessionCookies(response);
    return response;
  }

  // Normal navigation — let next-intl handle it, attach fresh cookies if refreshed.
  const response = createMiddleware(routing)(request);
  if (freshData) setRefreshedCookies(response, freshData);
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


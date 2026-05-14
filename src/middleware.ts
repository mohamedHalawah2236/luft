import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { getServerSession } from './utils/session';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const targetRoute = pathname.split('/').slice(2).join('/');
  const session = await getServerSession();

  const isAuth = !!session?.accessToken || !!session?.refreshToken;

  const authRoutes = ['login', 'signup', 'forget-password'];
  const isAuthRoute = authRoutes.some((route) => targetRoute.startsWith(route));

  const protectedRoutes = ['account/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    targetRoute.startsWith(route),
  );

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuth && isProtectedRoute) {
    const locale = pathname.split('/')[1] || 'en';
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return createMiddleware(routing)(request);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)',
  ],
};

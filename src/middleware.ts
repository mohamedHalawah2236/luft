import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const targetRoute = pathname.split('/').slice(2).join('/');
    const isAuth = await getToken({ req: request });
    const authRoutes = ['login', 'signup', 'forget-password'];
    const isAuthRoute = authRoutes.some((route) =>
      targetRoute.startsWith(route),
    );

    if (isAuth && isAuthRoute)
      return NextResponse.redirect(new URL('/', request.url));
    return createMiddleware(routing)(request);
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)',
  ],
};

import { NextResponse } from 'next/server';
import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const pathname = req.nextUrl.pathname;

    if (pathname === '/') {
      // console.log('Middleware log :', `'/' --> '/home'`);
      return NextResponse.redirect(new URL('/home', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - ... (others pages/routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sign).*)',
  ],
};

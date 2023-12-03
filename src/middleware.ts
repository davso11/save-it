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

export const config = { matcher: ['/', '/home/(.*)'] };

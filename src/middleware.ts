import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup', '/authorized'];
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const accessToken = (await cookies()).get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', process.env.APP_URL));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

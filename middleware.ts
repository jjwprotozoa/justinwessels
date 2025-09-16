import { NextResponse } from 'next/server';

export const config = { 
  matcher: ['/portfolio/:path*'] 
};

export function middleware(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.startsWith('/portfolio')) {
    url.pathname = url.pathname.replace('/portfolio', '/projects');
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

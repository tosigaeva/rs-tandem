import { NextRequest, NextResponse } from 'next/server';

import { supabaseServer } from './server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await supabaseServer(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const protectedRoutes = ['/library'];

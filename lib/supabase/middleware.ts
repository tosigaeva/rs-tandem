import { NextRequest, NextResponse } from 'next/server';

import { RoutePermissions, Routes } from '../routes';
import { supabaseServer } from './server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await supabaseServer(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = Object.entries(RoutePermissions).some(
    ([route, status]) => request.nextUrl.pathname.startsWith(route) && status === 'protected'
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = Routes.Login;
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

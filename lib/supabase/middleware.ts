import { NextRequest, NextResponse } from 'next/server';

import { RoutePermissions, Routes } from '../routes';
import { getNavigation } from '../utils';
import { supabaseServer } from './server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await supabaseServer(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = user?.app_metadata?.role;

  const path = request.nextUrl.pathname;

  const correctPath = getNavigation(path);

  if (correctPath != undefined) {
    const status = RoutePermissions[correctPath];

    if (status.access === 'authorized' && !user) {
      const url = request.nextUrl.clone();
      url.pathname = Routes.SignIn;
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    const unauthorized = status.access === 'unauthorized' && !!user;

    const restrictedRole =
      status.access === 'authorized' && !!status.allowedRoles && !status.allowedRoles.includes(userRole);

    if (unauthorized || restrictedRole) {
      const url = request.nextUrl.clone();
      url.pathname = Routes.Dashboard;
      return NextResponse.redirect(url);
    }
  }

  return response;
}

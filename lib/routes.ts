export enum Routes {
  Home = '/',
  Dashboard = '/dashboard',
  Library = '/library',
  SignIn = '/sign-in',
  Admin = '/admin-panel',
}

export const RoutePermissions: Record<Routes, 'all' | 'authorized' | 'unauthorized'> = {
  [Routes.Home]: 'all',
  [Routes.SignIn]: 'unauthorized',
  [Routes.Dashboard]: 'authorized',
  [Routes.Library]: 'authorized',
  [Routes.Admin]: 'authorized',
};

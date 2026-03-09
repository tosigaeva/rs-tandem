export enum Routes {
  Home = '/',
  Dashboard = '/dashboard',
  Library = '/library',
  SignIn = '/sign-in',
}

export const RoutePermissions: Record<Routes, 'all' | 'authorized' | 'unauthorized'> = {
  [Routes.Home]: 'all',
  [Routes.SignIn]: 'unauthorized',
  [Routes.Dashboard]: 'all',
  [Routes.Library]: 'all',
};

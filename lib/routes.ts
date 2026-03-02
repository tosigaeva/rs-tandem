export enum Routes {
  Home = '/',
  Dashboard = '/dashboard',
  Library = '/library',
  Login = '/login',
  Widget = '/widget',
}

export const RoutePermissions: Record<Routes, 'public' | 'protected'> = {
  [Routes.Home]: 'public',
  [Routes.Login]: 'public',
  [Routes.Dashboard]: 'protected',
  [Routes.Library]: 'protected',
  [Routes.Widget]: 'protected',
};

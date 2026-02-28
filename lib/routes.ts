export enum Routes {
  Home = '/',
  Dashboard = '/dashboard',
  Library = '/library',
  Login = '/login',
}

export const RoutePermissions: Record<Routes, 'public' | 'protected'> = {
  [Routes.Login]: 'public',
  [Routes.Dashboard]: 'protected',
  [Routes.Library]: 'protected',
};

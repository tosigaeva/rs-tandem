export enum Routes {
  Home = '/',
  Dashboard = '/dashboard',
  Library = '/library',
  SignIn = '/sign-in',
  Admin = '/admin-panel',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type RouteConfig = {
  access: 'all' | 'authorized' | 'unauthorized';
  allowedRoles?: UserRole[];
};

export const RoutePermissions: Record<Routes, RouteConfig> = {
  [Routes.Home]: { access: 'all' },
  [Routes.SignIn]: { access: 'unauthorized' },
  [Routes.Dashboard]: { access: 'authorized', allowedRoles: [UserRole.User, UserRole.Admin] },
  [Routes.Library]: { access: 'authorized', allowedRoles: [UserRole.User, UserRole.Admin] },
  [Routes.Admin]: { access: 'authorized', allowedRoles: [UserRole.User] },
};

'use client';

import { LogIn, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { PrimaryButton } from '@/components/PrimaryButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoutePermissions, Routes } from '@/lib/routes';
import { cn, getNavigation } from '@/lib/utils';
import { authService } from '@/services/authorization/auth.service';
import { useAuth } from '@/services/authorization/auth.store';
import { LocaleDictionary, useLocale } from '@/services/locale/locale.service';

const headerActionButtonClass =
  'border-primary/40 bg-gradient-to-b from-primary/10 to-accent/10 text-foreground shadow-xs shadow-primary/10 backdrop-blur-sm hover:border-primary/70 hover:from-primary/80 hover:to-accent/70 hover:text-primary-foreground';

export function Header() {
  const { user, initialAuthorization, isAuthorized, isAuthorizing } = useAuth();

  const { locale: currentLocale, languageCode, setLocale } = useLocale();

  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
  };

  const routes = Routes;
  const routePermissions = RoutePermissions;

  const pathname = usePathname();

  const handleUnauthorizedAccess = () => {
    const currentRoute = getNavigation(pathname);

    if (currentRoute != undefined) {
      const permission = RoutePermissions[currentRoute];

      if (permission === 'authorized') {
        const redirectPath = `${Routes.SignIn}?redirect=${encodeURIComponent(pathname)}`;

        router.push(redirectPath);

        console.log('should redirect');
      }
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();

    handleUnauthorizedAccess();
  };

  return (
    <header
      className={cn(
        'border-border bg-card relative z-25 border-b',
        !Boolean(initialAuthorization) || isAuthorizing ? 'cursor-wait select-none' : ''
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-6">
        <div className="flex flex-1">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <PrimaryButton
                variant="outline"
                size="icon"
                disabled={!Boolean(initialAuthorization) || isAuthorizing}
                className={headerActionButtonClass}
              >
                <Menu className="h-5 w-5" />
              </PrimaryButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 space-y-0.5 p-0.5">
              {Object.entries(routePermissions).map(([route, permission]) => {
                if (!displayRoute(permission, isAuthorized)) return;

                return (
                  <DropdownMenuItem
                    key={route}
                    asChild
                    className={cn('cursor-pointer', pathname === route && 'bg-primary text-white')}
                  >
                    <Link
                      href={route}
                      className="text-primary flex w-full justify-center font-bold capitalize underline-offset-4 hover:underline"
                    >
                      {route.slice(1).replaceAll('-', ' ') || 'home'}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1
          className={cn(
            'text-accent shrink-0 text-lg font-semibold uppercase',
            pathname === Routes.Home ? 'hidden' : 'hidden md:block'
          )}
        >
          JS Interview Trainer
        </h1>

        <div className="flex flex-1 items-start justify-end gap-2.5">
          {isAuthorized ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <PrimaryButton
                  variant="outline"
                  disabled={!Boolean(initialAuthorization) || isAuthorizing}
                  className={cn(headerActionButtonClass, 'max-w-48')}
                >
                  <User />
                  <span className="max-w-32 truncate" title={user?.username}>
                    {user?.username}
                  </span>
                </PrimaryButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 space-y-0.5 p-0.5">
                <DropdownMenuItem
                  asChild
                  className="focus:color-white cursor-pointer font-bold text-red-900 focus:bg-red-900 focus:text-white"
                  onClick={handleSignOut}
                >
                  <div>
                    <LogOut className="text-inherit" />
                    Sign Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <PrimaryButton
              variant="outline"
              disabled={!Boolean(initialAuthorization) || isAuthorizing}
              onClick={() => router.push(routes.SignIn)}
              className={headerActionButtonClass}
            >
              <LogIn /> Sign In
            </PrimaryButton>
          )}

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <PrimaryButton
                variant="outline"
                size="icon"
                disabled={!Boolean(initialAuthorization) || isAuthorizing}
                className={cn(headerActionButtonClass, 'uppercase')}
              >
                {languageCode}
              </PrimaryButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="space-y-0.5 p-0.5">
              {Object.entries(LocaleDictionary).map(([locale, info]) => {
                return (
                  <DropdownMenuItem asChild key={locale} onClick={() => handleLocaleChange(locale)}>
                    <div
                      className={cn(
                        'text-primary flex w-full justify-start font-bold capitalize',
                        currentLocale === locale ? 'bg-primary text-white' : ''
                      )}
                    >
                      {info.language}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function displayRoute(permission: 'all' | 'authorized' | 'unauthorized', isAuthorized: boolean) {
  const result =
    permission === 'all' ||
    (permission === 'authorized' && isAuthorized) ||
    (permission === 'unauthorized' && !isAuthorized);

  return result;
}

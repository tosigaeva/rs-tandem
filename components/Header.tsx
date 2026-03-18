'use client';

import { LogIn, LogOut, Menu, SquareMenu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import { PrimaryButton } from '@/components/PrimaryButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoutePermissions, Routes } from '@/lib/routes';
import { cn, getNavigation } from '@/lib/utils';
import { useLocale } from '@/providers/locale.provider';
import { authService } from '@/services/authorization/auth.service';
import { useAuth } from '@/services/authorization/auth.store';
import { LocaleDictionary, localeService } from '@/services/locale/locale.service';

import { Button } from './ui/button';

export function Header() {
  const { user, isAuthorized, isAuthorizing } = useAuth();

  const { locale: currentLocale, languageCode } = useLocale();

  const router = useRouter();

  const routes = Routes;
  const routePermissions = RoutePermissions;

  const pathname = usePathname();

  const isInitialized = useRef(false);

  const handleLocaleChange = (newLocale: string) => {
    localeService.setLocale(newLocale);

    router.refresh();
  };

  const handleUnauthorizedAccess = useCallback(() => {
    if (!isInitialized.current || isAuthorizing) return;

    const currentRoute = getNavigation(pathname);

    if (currentRoute != undefined) {
      const permission = RoutePermissions[currentRoute];

      if (!isAuthorized && permission === 'authorized') {
        const redirectPath = `${Routes.SignIn}?redirect=${encodeURIComponent(pathname)}`;

        router.push(redirectPath);
      }
    }
  }, [isAuthorizing, isAuthorized, pathname, router]);

  const handleSignOut = async () => {
    await authService.signOut();

    handleUnauthorizedAccess();
  };

  useEffect(() => {
    if (!isInitialized.current) {
      authService.initialize().finally(() => (isInitialized.current = true));
    }
  }, []);

  useEffect(() => {
    handleUnauthorizedAccess();
  }, [handleUnauthorizedAccess, isAuthorized]);

  return (
    <header
      className={cn('border-border bg-card relative z-25 border-b', isAuthorizing ? 'cursor-wait select-none' : '')}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" disabled={isAuthorizing}>
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
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

        <Button
          variant={'accent'}
          size={'lg'}
          disabled={isAuthorizing}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="text-lg">e-learing center</h1>
        </Button>

        <div className="flex h-fit w-fit items-start justify-end gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <PrimaryButton disabled={isAuthorizing} onClick={() => !isAuthorized && router.push(routes.SignIn)}>
                {user ? (
                  <>
                    <SquareMenu></SquareMenu> {user.username}
                  </>
                ) : (
                  <>
                    <LogIn></LogIn> Sign In
                  </>
                )}
              </PrimaryButton>
            </DropdownMenuTrigger>

            {isAuthorized && (
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem
                  asChild
                  className="focus:color-white cursor-pointer font-bold text-red-900 focus:bg-red-900 focus:text-white"
                  onClick={handleSignOut}
                >
                  <div>
                    <LogOut className="text-inherit"></LogOut>
                    Sign Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} size={'xs'} disabled={isAuthorizing} className="uppercase">
                {languageCode}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {Object.entries(LocaleDictionary).map(([locale, info]) => {
                return (
                  <DropdownMenuItem asChild key={locale} onClick={() => handleLocaleChange(locale)}>
                    <div
                      className={cn(
                        'text-primary flex w-full justify-start font-bold capitalize underline-offset-4 hover:underline',
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

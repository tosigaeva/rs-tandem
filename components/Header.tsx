'use client';

import { LogIn, LogOut, Menu, SquareMenu } from 'lucide-react';
import Image from 'next/image';
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
import { cn, getCurrentRoute } from '@/lib/utils';
import { authService, useAuth } from '@/services/auth.service';

import { Button } from './ui/button';

export function Header() {
  const { user, isAuthorized, isAuthorizing } = useAuth();

  const router = useRouter();

  const currentLocale = 'en';

  const currentFlag = () => {
    if (currentLocale === 'en') {
      return 'gb';
    }

    return currentLocale;
  };

  const routes = Routes;
  const routePermissions = RoutePermissions;

  const pathname = usePathname();

  const handleUnauthorizedAccess = useCallback(() => {
    const currentRoute = getCurrentRoute(pathname);

    if (currentRoute != undefined) {
      const permission = RoutePermissions[currentRoute];

      if (!isAuthorized && permission === 'authorized') {
        const redirectPath = `${Routes.SignIn}?redirect=${encodeURIComponent(pathname)}`;

        router.push(redirectPath);
      }
    }
  }, [isAuthorized, pathname, router]);

  const handleSignOut = async () => {
    await authService.signOut();

    handleUnauthorizedAccess();
  };

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      authService.initialize();
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (isAuthorizing) return;

    handleUnauthorizedAccess();
  }, [handleUnauthorizedAccess, isAuthorized, isAuthorizing]);

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
                  className={cn('cursor-pointer', pathname === route && 'bg-secondary text-white')}
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
              <Button variant={'outline'} size={'xs'} disabled={isAuthorizing}>
                <Image
                  src={`https://flagcdn.com/w20/${currentFlag()}.png`}
                  alt="flag"
                  className="menu-flag"
                  width={20}
                  height={10}
                />
              </Button>
            </DropdownMenuTrigger>
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

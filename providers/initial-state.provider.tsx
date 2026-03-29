'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { authService } from '@/services/authorization/auth.service';
import { useAuth } from '@/services/authorization/auth.store';
import { getLocaleFromCookies } from '@/services/locale/locale.service';

import { useLocale } from './locale.provider';

export function InitialStateProvider({ children }: { children: ReactNode }) {
  const { confirmInitialAuthorization } = useAuth();
  // const { setLocale } = useLocale();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const savedLocale = getLocaleFromCookies();
    // setLocale(savedLocale);

    authService.initialize().finally(() => {
      isInitialized.current = true;
      confirmInitialAuthorization();
    });
  }, [confirmInitialAuthorization]);

  return <>{children}</>;
}

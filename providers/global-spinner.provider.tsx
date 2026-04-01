'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { usePageState } from '@/store/page-state';

import { useAuth } from './auth-state.provider';

export function GlobalSpinnerProvider({ children }: { children: ReactNode }) {
  const { isAuthorizing } = useAuth();
  const isPageLoading = usePageState((state) => state.isPageLoading);

  const isLoading = () => isAuthorizing || isPageLoading;

  return (
    <>
      {isLoading() && <SpinnerCustom />}
      {children}
    </>
  );
}

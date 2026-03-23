'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { useAuth } from '@/services/authorization/auth.store';
import { usePageState } from '@/store/page-state';

export function GlobalSpinnerProvider({ children }: { children: ReactNode }) {
  const isAuthorizing = useAuth((state) => state.isAuthorizing);
  const isPageLoading = usePageState((state) => state.isPageLoading);

  const isLoading = () => isAuthorizing || isPageLoading;

  return (
    <>
      {isLoading() && <SpinnerCustom />}
      {children}
    </>
  );
}

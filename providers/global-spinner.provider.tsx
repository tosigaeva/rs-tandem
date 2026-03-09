'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { useAuth } from '@/services/authorization/auth.store';

export function GlobalSpinnerProvider({ children }: { children: ReactNode }) {
  const isAuthorizing = useAuth((state) => state.isAuthorizing);

  const isLoading = () => isAuthorizing;

  return (
    <>
      {isLoading() && <SpinnerCustom />}
      {children}
    </>
  );
}

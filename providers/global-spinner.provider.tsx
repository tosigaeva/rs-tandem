'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/SpinnerCustom';

import { useAuth } from './auth-state.provider';

export function GlobalSpinnerProvider({ children }: { children: ReactNode }) {
  const { isAuthorizing } = useAuth();

  return (
    <>
      {isAuthorizing && <SpinnerCustom />}
      {children}
    </>
  );
}

'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { useAuth } from '@/services/auth.service';

export function GlobalSpinnerProvider({ children }: { children: ReactNode }) {
  const isAuthorizing = useAuth((state) => state.isAuthorizing);

  const isLoading = () => isAuthorizing;

  if (isLoading())
    return (
      <>
        <SpinnerCustom />
        {children}
      </>
    );

  return <>{children}</>;
}

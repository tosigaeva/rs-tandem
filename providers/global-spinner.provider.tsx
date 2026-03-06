'use client';

import { ReactNode } from 'react';

import { SpinnerCustom } from '@/components/ui/custom-spinner';
import { useAuth } from '@/services/auth.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthorizing = useAuth((state) => state.isAuthorizing);

  // Global state control. Add your state check with ||
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

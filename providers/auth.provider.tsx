'use client';

import { ReactNode, useEffect } from 'react';

import { authService } from '@/services/auth.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    authService.initialize();
  }, []);

  return <>{children}</>;
}

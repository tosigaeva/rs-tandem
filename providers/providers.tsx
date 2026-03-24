import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { GlobalSpinnerProvider } from './global-spinner.provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalSpinnerProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </GlobalSpinnerProvider>
  );
}

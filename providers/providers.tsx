import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { GlobalSpinnerProvider } from './global-spinner.provider';
import { InitialStateProvider } from './initial-state.provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InitialStateProvider>
      <TooltipProvider>
        <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
      </TooltipProvider>
    </InitialStateProvider>
  );
}

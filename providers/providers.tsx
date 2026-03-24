import { ReactNode } from 'react';

import { GlobalSpinnerProvider } from './global-spinner.provider';
import { InitialStateProvider } from './initial-state.provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InitialStateProvider>
      <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
    </InitialStateProvider>
  );
}

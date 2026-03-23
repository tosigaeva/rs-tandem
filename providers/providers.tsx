import { ReactNode } from 'react';

import { GlobalSpinnerProvider } from './global-spinner.provider';

export function Providers({ children }: { children: ReactNode }) {
  return <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>;
}

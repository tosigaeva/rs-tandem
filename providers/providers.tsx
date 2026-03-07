import { GlobalSpinnerProvider } from './global-spinner.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>;
}

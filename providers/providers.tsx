import { ReactNode } from 'react';

import { Locale } from '@/services/locale/locale.service';

import { GlobalSpinnerProvider } from './global-spinner.provider';
import { LocaleProvider } from './locale.provider';

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LocaleProvider locale={locale}>
      <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
    </LocaleProvider>
  );
}

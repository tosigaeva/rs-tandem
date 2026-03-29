import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/services/locale/locale.service';

import { GlobalSpinnerProvider } from './global-spinner.provider';
import { InitialStateProvider } from './initial-state.provider';
import { LocaleProvider } from './locale.provider';

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <InitialStateProvider>
      <TooltipProvider>
        <LocaleProvider initialLocale={locale}>
          <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
        </LocaleProvider>
      </TooltipProvider>
    </InitialStateProvider>
  );
}

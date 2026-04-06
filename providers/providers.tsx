import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/services/locale/locale.service';

import { AuthStateProvider } from './auth-state.provider';
import { GlobalSpinnerProvider } from './global-spinner.provider';
import { LocaleProvider } from './locale.provider';

type ProvidersProperties = {
  locale: Locale;
  children: ReactNode;
  userDetails: string | undefined;
};

export function Providers({ locale, children, userDetails }: ProvidersProperties) {
  return (
    <LocaleProvider initialLocale={locale}>
      <AuthStateProvider userDetails={userDetails}>
        <TooltipProvider>
          <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
        </TooltipProvider>
      </AuthStateProvider>{' '}
    </LocaleProvider>
  );
}

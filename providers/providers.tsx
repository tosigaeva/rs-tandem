import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/services/locale/locale.service';
import { UserDetails } from '@/types/user';

import { AuthStateProvider } from './auth-state.provider';
import { GlobalSpinnerProvider } from './global-spinner.provider';
import { LocaleProvider } from './locale.provider';

type ProvidersProperties = {
  locale: Locale;
  children: ReactNode;
  userDetails: UserDetails | undefined;
  error?: string;
};

export function Providers({ locale, children, userDetails, error }: ProvidersProperties) {
  return (
    <LocaleProvider initialLocale={locale}>
      <AuthStateProvider userDetails={userDetails} error={error}>
        <TooltipProvider>
          <GlobalSpinnerProvider>{children}</GlobalSpinnerProvider>
        </TooltipProvider>
      </AuthStateProvider>{' '}
    </LocaleProvider>
  );
}

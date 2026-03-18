'use client';
import { createContext, ReactNode, useContext } from 'react';

import { Locale, LocaleDictionary, LocaleInfo } from '@/services/locale/locale.service';

const LocaleContext = createContext<LocaleInfo>({ locale: Locale.gb, ...LocaleDictionary[Locale.gb] });

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const localeInfo = { locale, ...LocaleDictionary[locale] };

  return <LocaleContext.Provider value={localeInfo}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('LocaleContext not found');
  }

  return context;
}

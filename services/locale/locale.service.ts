import Cookies from 'js-cookie';
import { create } from 'zustand';

export enum Locale {
  gb = 'gb',
  ru = 'ru',
  by = 'by',
}

export enum LanguageCode {
  en = 'en',
  ru = 'ru',
  by = 'by',
}

export enum Language {
  english = 'english',
  russian = 'русский',
  belarusian = 'беларуская',
}

export const LocaleDictionary: Record<Locale, { languageCode: LanguageCode; language: Language }> = {
  [Locale.gb]: { languageCode: LanguageCode.en, language: Language.english },
  [Locale.ru]: { languageCode: LanguageCode.ru, language: Language.russian },
  [Locale.by]: { languageCode: LanguageCode.by, language: Language.belarusian },
};

export const localeCookieName = 'custom_locale';

export type LocaleInfo = {
  locale: Locale;
  languageCode: LanguageCode;
  language: Language;
};

export const validateLocale = (inspectLocale: string | undefined) => {
  if (inspectLocale === undefined) return Locale.gb;

  return Object.values(Locale).find((locale) => locale === inspectLocale) ?? Locale.gb;
};

type LocaleState = {
  locale: Locale;
  languageCode: LanguageCode;
  language: Language;
  setLocale: (newLocale: string) => void;
};

export const getLocaleFromCookies = () => {
  return validateLocale(Cookies.get(localeCookieName));
};

export const useLocale = create<LocaleState>((set) => ({
  locale: Locale.gb,
  languageCode: LanguageCode.en,
  language: Language.english,

  setLocale: (newLocale: string) => {
    const valid = validateLocale(newLocale);

    Cookies.set(localeCookieName, valid, { expires: 365 });
    const languageInfo = LocaleDictionary[valid];
    set({ locale: valid, ...languageInfo });
  },
}));

import Cookies from 'js-cookie';

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
  belorussian = 'беларуская',
}

export const LocaleDictionary: Record<Locale, { languageCode: LanguageCode; language: Language }> = {
  [Locale.gb]: { languageCode: LanguageCode.en, language: Language.english },
  [Locale.ru]: { languageCode: LanguageCode.ru, language: Language.russian },
  [Locale.by]: { languageCode: LanguageCode.by, language: Language.belorussian },
};

export const localeCookieName = 'custom_locale';

export type LocaleInfo = {
  locale: Locale;
  languageCode: LanguageCode;
  language: Language;
};

export const localeService = {
  setLocale(newLocale: string): void {
    const valid = validateLocale(newLocale);

    Cookies.set(localeCookieName, valid, { expires: 365, path: '/' });
  },
};

export const validateLocale = (inspectLocale: string) => {
  return Object.values(Locale).find((locale) => locale === inspectLocale) ?? Locale.gb;
};

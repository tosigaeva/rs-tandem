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
  belorussian = 'беларуская',
}

export const LocaleDirectory: Record<Locale, { languageCode: LanguageCode; language: Language }> = {
  [Locale.gb]: { languageCode: LanguageCode.en, language: Language.english },
  [Locale.ru]: { languageCode: LanguageCode.ru, language: Language.russian },
  [Locale.by]: { languageCode: LanguageCode.by, language: Language.belorussian },
};

type LocaleStore = {
  locale: Locale;
  languageCode: LanguageCode;
  language: Language;
  setLocale: (locale: Locale) => void;
};

export const useLocale = create<LocaleStore>((set) => ({
  locale: Locale.gb,
  languageCode: LocaleDirectory[Locale.gb].languageCode,
  language: LocaleDirectory[Locale.gb].language,
  setLocale: (locale) =>
    set({ locale, languageCode: LocaleDirectory[locale].languageCode, language: LocaleDirectory[locale].language }),
}));

const localeCookieName = 'custom_locale';

const saveToCookies = (locale: Locale) => {
  Cookies.set(localeCookieName, locale);
};

const getLocaleCookie = () => {
  return Cookies.get()[localeCookieName] ?? Locale.gb;
};

export const localeService = {
  setLocale(newLocale: string) {
    const valid = Object.values(Locale).find((locale) => locale === newLocale) ?? Locale.gb;

    useLocale.getState().setLocale(valid);
    saveToCookies(valid);
  },

  initializeLocale() {
    const savedLocale = getLocaleCookie();

    this.setLocale(savedLocale);
  },
};

import { cookies } from 'next/headers';

import { formatMessage } from '@/services/locale/format-message';

import { Locale, localeCookieName, LocaleDictionary, validateLocale } from './locale.service';
import { AppMessages, MessageKey } from './messages';

export async function getServerLocale() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value ?? Locale.gb;

  return validateLocale(cookieLocale);
}

export async function getServerLanguageCode() {
  const locale = await getServerLocale();

  return LocaleDictionary[locale].languageCode;
}

export async function getServerT() {
  const languageCode = await getServerLanguageCode();

  return (key: MessageKey, values?: Record<string, string | number>): string => {
    const template = AppMessages[key]?.[languageCode] ?? key;

    if (!values) return template;

    return formatMessage(template, values);
  };
}

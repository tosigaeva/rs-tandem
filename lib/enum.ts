import { Locale } from '@/types/locale';

function isEnumValue<T extends Record<string, string>>(enumObject: T, value: string): value is T[keyof T] {
  return Object.values(enumObject).includes(value);
}

export function parseEnum<T extends Record<string, string>>(enumObject: T, string_: string): T[keyof T] {
  if (isEnumValue(enumObject, string_)) {
    return string_;
  }
  throw new Error(`Invalid enum value: ${string_}`);
}

export function mapToLocale(object: Record<string, string>): Record<Locale, string> {
  return {
    [Locale.ru]: object[Locale.ru] ?? '',
    [Locale.en]: object[Locale.en] ?? '',
    [Locale.by]: object[Locale.by] ?? '',
  };
}

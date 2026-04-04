import { eachDayOfInterval, format, parseISO, startOfDay, subDays } from 'date-fns';

import { LanguageCode } from '@/services/locale/locale.service';
import { getDateFnsLocale } from '@/services/locale/locale-format';

const dateKeyFormat = 'yyyy-MM-dd';
const dateLabelFormat = 'PPP';
const monthLabelFormat = 'MMM';

export function getDateKey(date: Date): string {
  return format(date, dateKeyFormat);
}

export function parseDateKey(date: string): Date | undefined {
  const parsedDate = parseISO(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return parsedDate;
}

export function formatDateLabel(date: string, languageCode: LanguageCode = LanguageCode.en): string {
  const parsedDate = parseDateKey(date);

  if (parsedDate === undefined) {
    return date;
  }

  return format(parsedDate, dateLabelFormat, { locale: getDateFnsLocale(languageCode) });
}

export function formatMonthLabel(date: string, languageCode: LanguageCode = LanguageCode.en): string {
  const parsedDate = parseDateKey(date);

  if (parsedDate === undefined) {
    return date;
  }

  return format(parsedDate, monthLabelFormat, { locale: getDateFnsLocale(languageCode) });
}

export function normalizeDate(date: Date): Date {
  return startOfDay(date);
}

export function buildDateRange(totalDays: number, endDate: Date = new Date()): Date[] {
  const normalizedEndDate = normalizeDate(endDate);
  const startDate = subDays(normalizedEndDate, totalDays - 1);

  return eachDayOfInterval({ start: startDate, end: normalizedEndDate });
}

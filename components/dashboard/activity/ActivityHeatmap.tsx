'use client';

import { eachDayOfInterval, endOfMonth, getISODay, startOfMonth, subMonths } from 'date-fns';

import { useLocale } from '@/services/locale/locale.service';

import { ActivityCell, ActivityDay } from './activity.types';
import { getActivityLevel } from './activity.utilities';
import { formatMonthLabel, getDateKey, parseDateKey } from './activity-date.utilities';
import { ActivityDayCell } from './ActivityDayCell';

type ActivityHeatmapProperties = {
  days: ActivityDay[];
  monthCount?: number;
};

function getCountsByDate(days: ActivityDay[]): Map<string, number> {
  return days.reduce((accumulator, day) => {
    const parsedDate = parseDateKey(day.date);

    if (parsedDate === undefined) {
      return accumulator;
    }

    const key = getDateKey(parsedDate);
    const previous = accumulator.get(key) ?? 0;

    accumulator.set(key, previous + day.count);
    return accumulator;
  }, new Map<string, number>());
}

type CalendarCell = {
  isCurrentMonth: boolean;
  day?: ActivityCell;
};

function buildMonthCells(monthDate: Date, countsByDate: Map<string, number>): CalendarCell[] {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const intervalDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const leadingPadding = getISODay(monthStart) - 1;
  const cells: CalendarCell[] = Array.from({ length: leadingPadding }, () => ({
    isCurrentMonth: false,
  }));

  for (const date of intervalDays) {
    const key = getDateKey(date);
    const count = countsByDate.get(key) ?? 0;

    cells.push({
      isCurrentMonth: true,
      day: {
        date: key,
        count,
        level: getActivityLevel(count),
      },
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ isCurrentMonth: false });
  }

  return cells;
}

export function ActivityHeatmap({ days, monthCount = 3 }: ActivityHeatmapProperties) {
  const { languageCode } = useLocale();
  const countsByDate = getCountsByDate(days);
  const currentMonth = startOfMonth(new Date());
  const months = Array.from({ length: monthCount }, (_, index) => subMonths(currentMonth, monthCount - index - 1));

  return (
    <section className="max-[500px]:overflow-x-auto">
      <div className="inline-flex w-max items-start gap-2.5">
        {months.map((monthDate) => {
          const monthCells = buildMonthCells(monthDate, countsByDate);
          const monthLabel = formatMonthLabel(getDateKey(monthDate), languageCode);

          return (
            <article key={getDateKey(monthDate)} className="space-y-3">
              <p className="text-muted-foreground/90 text-left text-base leading-none font-normal tracking-tight">
                {monthLabel}
              </p>

              <div className="grid grid-cols-7 gap-1.5">
                {monthCells.map((cell, index) => {
                  if (!cell.isCurrentMonth || cell.day === undefined) {
                    return <span key={`empty-${getDateKey(monthDate)}-${index}`} className="h-3 w-3" aria-hidden />;
                  }

                  return <ActivityDayCell key={cell.day.date} day={cell.day} />;
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

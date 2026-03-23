import { ActivityCell, ActivityDay, ActivityLevel } from './activity.types';
import { buildDateRange, getDateKey, parseDateKey } from './activity-date.utilities';

type ActivityThresholds = {
  medium: number;
  high: number;
};

const defaultThresholds: ActivityThresholds = {
  medium: 5,
  high: 10,
};

export function getActivityLevel(count: number, thresholds: ActivityThresholds = defaultThresholds): ActivityLevel {
  if (count <= 0) return 'none';
  if (count >= thresholds.high) return 'high';
  if (count >= thresholds.medium) return 'medium';
  return 'low';
}

function groupByDate(days: ActivityDay[]): Map<string, number> {
  return days.reduce((accumulator, day) => {
    const parsedDate = parseDateKey(day.date);

    if (parsedDate === undefined) {
      return accumulator;
    }

    const dateKey = getDateKey(parsedDate);
    const previousCount = accumulator.get(dateKey) ?? 0;

    accumulator.set(dateKey, previousCount + day.count);
    return accumulator;
  }, new Map<string, number>());
}

export function buildActivityTimeline(
  days: ActivityDay[],
  totalDays = 84,
  endDate: Date = new Date(),
  thresholds?: ActivityThresholds
): ActivityCell[] {
  const countsByDate = groupByDate(days);
  const dateRange = buildDateRange(totalDays, endDate);

  return dateRange.map((date) => {
    const dateKey = getDateKey(date);
    const count = countsByDate.get(dateKey) ?? 0;

    return {
      date: dateKey,
      count,
      level: getActivityLevel(count, thresholds),
    };
  });
}

export function splitByWeeks(cells: ActivityCell[]): ActivityCell[][] {
  return cells.reduce<ActivityCell[][]>((weeks, cell, index) => {
    const weekIndex = Math.floor(index / 7);

    if (weeks[weekIndex] === undefined) {
      weeks[weekIndex] = [];
    }

    weeks[weekIndex].push(cell);
    return weeks;
  }, []);
}

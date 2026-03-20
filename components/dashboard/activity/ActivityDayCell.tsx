'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

import { activityLevelClassMap } from './activity.constants';
import { ActivityCell } from './activity.types';
import { formatDateLabel } from './activity-date.utilities';

type ActivityDayCellProperties = {
  day: ActivityCell;
};

function getDayLabel(day: ActivityCell): string {
  const formattedDate = formatDateLabel(day.date);

  if (day.count === 0) {
    return `No activity on ${formattedDate}`;
  }

  return `${day.count} answers on ${formattedDate}`;
}

export function ActivityDayCell({ day }: ActivityDayCellProperties) {
  return (
    <HoverCard openDelay={80} closeDelay={40}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={getDayLabel(day)}
          className={cn(
            'focus-visible:ring-ring size-3 rounded-full transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none',
            activityLevelClassMap[day.level]
          )}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit px-3 py-2 text-xs">{getDayLabel(day)}</HoverCardContent>
    </HoverCard>
  );
}

'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { LanguageCode } from '@/services/locale/locale.service';
import type { MessageKey } from '@/services/locale/messages';
import { selectPluralCategory } from '@/services/locale/plural';

import { activityLevelColorMap } from './activity.constants';
import { ActivityCell } from './activity.types';
import { formatDateLabel } from './activity-date.utilities';

type ActivityDayCellProperties = {
  day: ActivityCell;
};

function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replaceAll(/\{(\w+)\}/g, (match, token) => String(values[token] ?? match));
}

function getAnswerLabelKey(count: number, languageCode: LanguageCode): MessageKey {
  const category = selectPluralCategory(count, languageCode);

  if (category === 'one') {
    return 'dashboard.activity.day.answers.one';
  }

  if (category === 'few') {
    return 'dashboard.activity.day.answers.few';
  }

  if (category === 'many') {
    return 'dashboard.activity.day.answers.many';
  }

  return 'dashboard.activity.day.answers.other';
}

function getDayLabel(day: ActivityCell, languageCode: LanguageCode, t: (key: MessageKey) => string): string {
  const formattedDate = formatDateLabel(day.date, languageCode);

  if (day.count === 0) {
    return formatMessage(t('dashboard.activity.day.no'), { date: formattedDate });
  }

  return formatMessage(t(getAnswerLabelKey(day.count, languageCode)), { count: day.count, date: formattedDate });
}

export function ActivityDayCell({ day }: ActivityDayCellProperties) {
  const { t, languageCode } = useTranslation();
  const label = getDayLabel(day, languageCode, t);

  return (
    <HoverCard openDelay={80} closeDelay={40}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            'focus-visible:ring-ring h-3 w-3 rounded-full transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none'
          )}
          style={{ backgroundColor: activityLevelColorMap[day.level] }}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit px-3 py-2 text-xs">{label}</HoverCardContent>
    </HoverCard>
  );
}

'use client';

import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Level, LevelFilter, LevelLocales } from '@/types/schemas/topic-schema';
import { WidgetFilter, WidgetType } from '@/types/widget';

type WidgetTopicFilterProperties = {
  widgetFilter: WidgetFilter;
  levelFilter: LevelFilter;
  searchQuery: string;
  onWidgetFilterChange: (value: WidgetFilter) => void;
  onLevelFilterChange: (value: LevelFilter) => void;
  onSearchQueryChange: (value: string) => void;
};

const WIDGET_FILTER_OPTIONS: { value: WidgetFilter; labelKey: WidgetFilterLabelKey }[] = [
  { value: 'all', labelKey: 'library.filter.option.all' },
  { value: WidgetType.Quiz, labelKey: 'library.filter.option.quiz' },
  { value: WidgetType.TrueFalse, labelKey: 'library.filter.option.trueFalse' },
  { value: WidgetType.CodeCompletion, labelKey: 'library.filter.option.codeCompletion' },
  { value: WidgetType.FlipCard, labelKey: 'library.filter.option.flipCard' },
  { value: WidgetType.BigONotation, labelKey: 'library.filter.option.bigO' },
  { value: WidgetType.CodeOrdering, labelKey: 'library.filter.option.codeOrdering' },
];

const LEVEL_FILTER_OPTIONS: LevelFilter[] = ['all', Level.beginner, Level.intermediate, Level.advanced];

type WidgetFilterLabelKey =
  | 'library.filter.option.all'
  | 'library.filter.option.quiz'
  | 'library.filter.option.trueFalse'
  | 'library.filter.option.codeCompletion'
  | 'library.filter.option.flipCard'
  | 'library.filter.option.bigO'
  | 'library.filter.option.codeOrdering';

export function WidgetTopicFilter({
  widgetFilter,
  levelFilter,
  searchQuery,
  onWidgetFilterChange,
  onLevelFilterChange,
  onSearchQueryChange,
}: WidgetTopicFilterProperties) {
  const { t, languageCode } = useTranslation();

  return (
    <section className="border-border bg-card space-y-5 rounded-2xl border p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold tracking-wide uppercase">{t('library.filter.label')}</h2>
        <p className="text-muted-foreground text-sm">{t('library.filter.description')}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="discover-topics-search" className="text-sm font-medium">
          {t('library.search.label')}
        </label>
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="discover-topics-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder={t('library.search.placeholder')}
            className="bg-background pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t('library.filter.widgetLabel')}</p>
        <div className="-mx-1 flex flex-wrap gap-2">
          {WIDGET_FILTER_OPTIONS.map((option) => {
            const isActive = option.value === widgetFilter;

            return (
              <Button
                key={option.value}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                aria-pressed={isActive}
                className={cn('rounded-full px-4', !isActive && 'bg-background')}
                onClick={() => onWidgetFilterChange(option.value)}
              >
                {t(option.labelKey)}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t('library.filter.levelLabel')}</p>
        <div className="-mx-1 flex flex-wrap gap-2">
          {LEVEL_FILTER_OPTIONS.map((option) => {
            const isActive = option === levelFilter;
            const label = option === 'all' ? t('library.filter.option.levelAll') : LevelLocales[option][languageCode];

            return (
              <Button
                key={option}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                aria-pressed={isActive}
                className={cn('rounded-full px-4 capitalize', !isActive && 'bg-background')}
                onClick={() => onLevelFilterChange(option)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

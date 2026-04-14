'use client';

import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
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
  { value: WidgetType.AsyncSorter, labelKey: 'library.filter.option.asyncSorter' },
];

const LEVEL_FILTER_OPTIONS: LevelFilter[] = ['all', Level.beginner, Level.intermediate, Level.advanced];

type WidgetFilterLabelKey =
  | 'library.filter.option.all'
  | 'library.filter.option.quiz'
  | 'library.filter.option.trueFalse'
  | 'library.filter.option.codeCompletion'
  | 'library.filter.option.flipCard'
  | 'library.filter.option.bigO'
  | 'library.filter.option.codeOrdering'
  | 'library.filter.option.asyncSorter';

export function WidgetTopicFilter({
  widgetFilter,
  levelFilter,
  searchQuery,
  onWidgetFilterChange,
  onLevelFilterChange,
  onSearchQueryChange,
}: WidgetTopicFilterProperties) {
  const { t, languageCode } = useTranslation();
  const [isMinimized, setIsMinimized] = useState(true);
  const activeWidgetLabel = WIDGET_FILTER_OPTIONS.find((option) => option.value === widgetFilter)?.labelKey;
  const activeLevelLabel = levelFilter === 'all' ? undefined : LevelLocales[levelFilter][languageCode];
  const trimmedSearchQuery = searchQuery.trim();
  const hasSummary = activeWidgetLabel !== undefined || activeLevelLabel !== undefined || trimmedSearchQuery.length > 0;

  return (
    <section className={cn('border-border bg-card h-full rounded-2xl border p-5 transition-all duration-300')}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold tracking-wide uppercase">{t('library.filter.label')}</h2>
          {!isMinimized && <p className="text-muted-foreground text-sm">{t('library.filter.description')}</p>}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => setIsMinimized((value) => !value)}
        >
          {isMinimized ? t('library.filter.expand') : t('library.filter.collapse')}
          {<ChevronDownIcon className={cn('size-4 transition-transform duration-300', !isMinimized && 'rotate-180')} />}
        </Button>
      </div>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isMinimized ? 'grid-rows-[0fr] opacity-0' : 'mt-5 grid-rows-[1fr] opacity-100'
        )}
      >
        <div className="space-y-5 overflow-hidden">
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
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
              {LEVEL_FILTER_OPTIONS.map((option) => {
                const isActive = option === levelFilter;

                const label =
                  option === 'all' ? t('library.filter.option.levelAll') : LevelLocales[option][languageCode];

                return (
                  <Button
                    key={option}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className={cn('rounded-full px-4 capitalize', !isActive && 'bg-background')}
                    onClick={() => onLevelFilterChange(option)}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isMinimized ? 'mt-4 max-h-20 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {hasSummary && (
          <div className="flex flex-row flex-wrap gap-3 text-sm">
            {activeWidgetLabel !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{t('library.filter.summary.widget')}</span>
                <Badge variant="secondary">{t(activeWidgetLabel)}</Badge>
              </div>
            )}
            {activeLevelLabel !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{t('library.filter.summary.level')}</span>
                <Badge variant="secondary">{activeLevelLabel}</Badge>
              </div>
            )}
            {trimmedSearchQuery.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{t('library.filter.summary.search')}</span>
                <Badge variant="secondary" className="max-w-40 truncate">
                  {trimmedSearchQuery}
                </Badge>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

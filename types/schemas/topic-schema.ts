import { z } from 'zod';

import { LanguageCode } from '@/services/locale/locale.service';

import { LocaleString, LocaleStringSchema } from './locale-schemas';
import { WidgetSchema } from './widget-schema';

export enum Level {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export enum Subject {
  javascript = 'JavaScript',
  typescript = 'TypeScript',
}

export const LevelLocales: Record<Level, LocaleString> = {
  [Level.beginner]: {
    [LanguageCode.en]: 'beginner',
    [LanguageCode.ru]: 'начинающий',
    [LanguageCode.by]: 'пачатковец',
  },
  [Level.intermediate]: {
    [LanguageCode.en]: 'intermediate',
    [LanguageCode.ru]: 'средний',
    [LanguageCode.by]: 'сярэдні',
  },
  [Level.advanced]: {
    [LanguageCode.en]: 'advanced',
    [LanguageCode.ru]: 'продвинутый',
    [LanguageCode.by]: 'прасунуты',
  },
};

const TopicBaseSchema = z.object({
  id: z.number().int(),
  name: LocaleStringSchema,
  level: z.enum(Level),
  description: LocaleStringSchema,
  subject: z.enum(Subject),
  created_at: z.coerce.date(),
});

type TopicBase = z.infer<typeof TopicBaseSchema>;

const mapBaseFields = (data: TopicBase) => ({
  id: data.id,
  name: data.name,
  level: data.level,
  description: data.description,
  subject: data.subject,
  createdAt: data.created_at,
});

export const TopicAdminListItemSchema = TopicBaseSchema.extend({
  sum_questions: z.number().int().nonnegative().default(0),
}).transform((data) => {
  const base = mapBaseFields(data);

  return {
    ...base,
    sumQuestions: data.sum_questions,
  };
});

export type TopicAdminListItem = z.infer<typeof TopicAdminListItemSchema>;

export const TopicOverviewSchema = TopicBaseSchema.extend({
  last_accessed_at: z.coerce.date().nullable(),
  widgets: z.array(z.lazy(() => WidgetSchema)).default([]),
}).transform((data) => {
  const base = mapBaseFields(data);

  return {
    ...base,
    progress: calculateProgress(
      data.widgets.reduce((sum, widget) => sum + widget.correctAnswers, 0),
      data.widgets.reduce((sum, widget) => sum + widget.totalQuestions, 0)
    ),
    lastTrainedAt: data.last_accessed_at ?? undefined,
    widgets: data.widgets,
  };
});

export type TopicOverview = z.infer<typeof TopicOverviewSchema>;

const calculateProgress = (correctAnswers: number, totalQuestions: number) => {
  if (totalQuestions === 0) return 0;

  return (correctAnswers / totalQuestions) * 100;
};

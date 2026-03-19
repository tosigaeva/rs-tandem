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

export const TopicSchema = z
  .object({
    id: z.number(),
    name: LocaleStringSchema,
    level: z.enum(Level),
    description: LocaleStringSchema,
    subject: z.enum(Subject),
    last_accessed_at: z.coerce.date().nullable(),
    created_at: z.coerce.date(),
    widgets: z.array(z.lazy(() => WidgetSchema)).default([]),
  })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    level: data.level,
    description: data.description,
    subject: data.subject,
    lastTrainedAt: data.last_accessed_at ?? undefined,
    progress: calculateProgress(
      data.widgets.reduce((sum, widget) => (sum += widget.correctAnswers), 0),
      data.widgets.reduce((sum, widget) => (sum += widget.totalQuestions), 0)
    ),
    createdAt: data.created_at,
    widgets: [],
  }));

export type Topic = z.infer<typeof TopicSchema>;

const calculateProgress = (correctAnswers: number, totalQuestions: number) => {
  if (totalQuestions === 0) return 0;

  return (correctAnswers / totalQuestions) * 100;
};

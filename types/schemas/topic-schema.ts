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
    level: z.nativeEnum(Level),
    description: LocaleStringSchema,
    subject: z.nativeEnum(Subject),
    last_accessed_at: z.coerce.date().nullable(),
    created_at: z.coerce.date(),
    widgets: z.array(WidgetSchema).default([]),
  })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    level: data.level,
    description: data.description,
    subject: data.subject,
    lastAccessedAt: data.last_accessed_at,
    totalQuestions: data.widgets.reduce((sum, widget) => (sum += widget.totalQuestions), 0),
    correctAnswers: data.widgets.reduce((sum, widget) => (sum += widget.correctAnswers), 0),
    createdAt: data.created_at,
    widgets: data.widgets,
  }));

export type Topic = z.infer<typeof TopicSchema>;

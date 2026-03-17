import { z } from 'zod';

import { LanguageCode, LocaleString, LocaleStringSchema } from '@/services/locale.service';

import { WidgetType } from '../widget';

export enum Level {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
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

export enum Subject {
  javascript = 'JavaScript',
  typescript = 'TypeScript',
}

export const WidgetSchema = z
  .object({
    type: z.enum(WidgetType),
    name: LocaleStringSchema,
    last_accessed_at: z.coerce.date().nullable(),
    total_questions: z.number(),
    correct_answers: z.number(),
  })
  .transform((data) => ({
    type: data.type,
    name: LocaleStringSchema,
    lastAccessedAt: data.last_accessed_at,
    totalQuestions: data.total_questions,
    correctAnswers: data.correct_answers,
  }));

export type Widget = z.infer<typeof WidgetSchema>;

export const TopicSchema = z
  .object({
    id: z.number(),
    name: LocaleStringSchema,
    level: z.enum(Level),
    description: LocaleStringSchema,
    subject: z.enum(Subject),
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

import { z } from 'zod';

import { WidgetType } from '../widget';

export enum Level {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export enum Subject {
  javascript = 'JavaScript',
  typescript = 'TypeScript',
}

export const WidgetSchema = z
  .object({
    type: z.enum(WidgetType),
    last_accessed_at: z.coerce.date().nullable(),
    total_answers: z.number(),
    correct_answers: z.number(),
  })
  .transform((data) => ({
    type: data.type,
    lastAccessedAt: data.last_accessed_at,
    totalAnswers: data.total_answers,
    correctAnswers: data.correct_answers,
  }));

export type Widget = z.infer<typeof WidgetSchema>;

export const TopicSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    level: z.enum(Level),
    description: z.string(),
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
    totalAnswers: data.widgets.reduce((sum, widget) => (sum += widget.totalAnswers), 0),
    correctAnswers: data.widgets.reduce((sum, widget) => (sum += widget.correctAnswers), 0),
    createdAt: data.created_at,
    widgets: data.widgets,
  }));

export type Topic = z.infer<typeof TopicSchema>;

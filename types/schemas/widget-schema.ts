import z from 'zod';

import { WidgetType } from '../widget';
import { LocaleStringSchema } from './locale-schemas';

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
    name: data.name,
    lastAccessedAt: data.last_accessed_at,
    totalQuestions: data.total_questions,
    correctAnswers: data.correct_answers,
  }));

export type Widget = z.infer<typeof WidgetSchema>;

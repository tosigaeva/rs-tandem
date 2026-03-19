import z from 'zod';

import { WidgetType } from '../widget';
import { LocaleStringSchema } from './locale-schemas';

export const WidgetSchema = z
  .object({
    type: z.enum(WidgetType),
    name: LocaleStringSchema,
    // description: z.string().nullable(),
    // icon: z.string().nullable(),
    last_accessed_at: z.coerce.date().nullable(),
    total_questions: z.number(),
    correct_answers: z.number(),
  })
  .transform((data) => ({
    type: data.type,
    title: data.name,
    description: '',
    icon: '',
    lastTrainedAt: data.last_accessed_at,
    totalQuestions: data.total_questions,
    correctAnswers: data.correct_answers,
    progress: (data.correct_answers / data.total_questions) * 100,
  }));

export type Widget = z.infer<typeof WidgetSchema>;

import { z } from 'zod';

import { WidgetType } from '../widget';
import { LocaleStringSchema } from './locale-schemas';

const WidgetBaseSchema = z.object({
  type: z.enum(WidgetType),
  name: LocaleStringSchema,
  // description: z.string().nullable(),
  // icon: z.string().nullable(),
});
type WidgetBase = z.infer<typeof WidgetBaseSchema>;

const mapBaseFields = (data: WidgetBase) => ({
  type: data.type,
  name: data.name,
  description: '',
  icon: '',
});

export const WidgetSchema = WidgetBaseSchema;

export const WidgetOverviewSchema = WidgetBaseSchema.extend({
  last_accessed_at: z.coerce.date().nullable(),
  total_questions: z.number(),
  correct_answers: z.number(),
}).transform((data) => {
  const base = mapBaseFields(data);

  return {
    ...base,
    lastTrainedAt: data.last_accessed_at,
    totalQuestions: data.total_questions,
    correctAnswers: data.correct_answers,
    progress: (data.correct_answers / data.total_questions) * 100,
  };
});
export type WidgetOverview = z.infer<typeof WidgetOverviewSchema>;

export const WidgetAdminListItemSchema = WidgetBaseSchema.extend({
  created_at: z.coerce.date(),
  sum_questions: z.number(),
}).transform((data) => {
  const base = mapBaseFields(data);

  return {
    ...base,
    createdAt: data.created_at,
    sumQuestions: data.sum_questions,
  };
});
export type WidgetAdminListItem = z.infer<typeof WidgetAdminListItemSchema>;

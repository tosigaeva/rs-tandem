import { z } from 'zod';

import { LocaleStringSchema } from './locale-schemas';

export enum BigOComplexity {
  Constant = 'O(1)',
  Logarithmic = 'O(log n)',
  Linear = 'O(n)',
  Linearithmic = 'O(n log n)',
  Quadratic = 'O(n^2)',
  Cubic = 'O(n^3)',
  Exponential = 'O(2^n)',
  Factorial = 'O(n!)',
}

/// Payload Question Schemas
export const QuizPayloadQuestionSchema = z.object({
  question: LocaleStringSchema,
  options: z.array(LocaleStringSchema),
});
export type QuizPayloadQuestion = z.infer<typeof QuizPayloadQuestionSchema>;

export const TrueFalsePayloadQuestionSchema = z.object({
  statement: LocaleStringSchema,
  explanation: LocaleStringSchema.nullable(),
});
export type TrueFalsePayloadQuestion = z.infer<typeof TrueFalsePayloadQuestionSchema>;

export const CodeCompletionPayloadQuestionSchema = z.object({
  code: z.string(),
  blanks: z.array(z.string()),
  hints: z.array(z.string()),
});
export type CodeCompletionPayloadQuestion = z.infer<typeof CodeCompletionPayloadQuestionSchema>;

export const FlipCardPayloadQuestionSchema = z.object({
  term: LocaleStringSchema,
  definition: LocaleStringSchema,
});
export type FlipCardPayloadQuestion = z.infer<typeof FlipCardPayloadQuestionSchema>;

export const BigOPayloadQuestionSchema = z.object({
  question: LocaleStringSchema,
  codeExample: z.string(),
});
export type BigOPayloadQuestion = z.infer<typeof BigOPayloadQuestionSchema>;

/// Payload Answer Schemas
export const QuizPayloadAnswerSchema = z.object({
  correctIndex: z.number().min(1).max(4),
});
export type QuizPayloadAnswer = z.infer<typeof QuizPayloadAnswerSchema>;

export const TrueFalsePayloadAnswerSchema = z.object({
  correct: z.boolean(),
});
export type TrueFalsePayloadAnswer = z.infer<typeof TrueFalsePayloadAnswerSchema>;

export const CodeCompletionPayloadAnswerSchema = z.object({
  correctOrder: z.array(z.number()),
});
export type CodeCompletionPayloadAnswer = z.infer<typeof CodeCompletionPayloadAnswerSchema>;

export const BigOPayloadAnswerSchema = z.object({
  correctComplexity: z.enum(BigOComplexity),
});
export type BigOPayloadAnswer = z.infer<typeof BigOPayloadAnswerSchema>;

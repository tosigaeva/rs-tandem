import { z } from 'zod';

import { LocaleStringSchema } from './locale-schemas';

/// Payload Question Schemas
export const QuizPayloadQuestionSchema = z.object({
  question: LocaleStringSchema,
  options: z.string(),
});
export type QuizPayloadQuestion = z.infer<typeof QuizPayloadQuestionSchema>;

export const TrueFalsePayloadQuestionSchema = z
  .object({
    statement: LocaleStringSchema,
  })
  .transform((data) => ({
    statement: data.statement,
  }));
export type TrueFalsePayloadQuestion = z.infer<typeof TrueFalsePayloadQuestionSchema>;

export const CodeCompletionPayloadQuestionSchema = z.object({
  code: z.string(),
  blanks: z.array(z.string()),
  hints: z.array(z.string()),
});
export type CodeCompletionPayloadQuestion = z.infer<typeof CodeCompletionPayloadQuestionSchema>;

export const FlipCardPayloadQuestionSchema = z.object({
  term: z.string(),
  definition: z.string(),
});
export type FlipCardPayloadQuestion = z.infer<typeof FlipCardPayloadQuestionSchema>;

export const BigOWPayloadQuestionSchema = z.object({
  question: LocaleStringSchema,
  codeExample: z.string(),
});
export type BigOPayloadQuestion = z.infer<typeof BigOWPayloadQuestionSchema>;

/// Payload Answer Schemas
export const TrueFalsePayloadAnswerSchema = z.object({
  explanation: LocaleStringSchema,
});
export type TrueFalsePayloadAnswer = z.infer<typeof TrueFalsePayloadAnswerSchema>;

/// Question Schemas
const QuestionBaseSchema = z.object({
  id: z.number().int(),
  topic_id: z.number().int(),
  widget_type: z.string(),
  created_at: z.coerce.date(),
});

type QuestionBase = z.infer<typeof QuestionBaseSchema>;

const mapQuestionBaseFields = (data: QuestionBase) => ({
  id: data.id,
  topicId: data.topic_id,
  widgetType: data.widget_type,
  createdAt: data.created_at,
});

export const QuestionSchema = QuestionBaseSchema.extend({}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return { ...base };
});
export type Question = z.infer<typeof QuestionBaseSchema>;

export const QuizQuestionSchema = QuestionBaseSchema.extend({
  payload_question: QuizPayloadQuestionSchema,
}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return {
    ...base,
    payloadQuestion: data.payload_question,
  };
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const TrueFalseQuestionSchema = QuestionBaseSchema.extend({
  payload_question: TrueFalsePayloadQuestionSchema,
  payload_answer: TrueFalsePayloadAnswerSchema,
}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return {
    ...base,
    payloadQuestion: data.payload_question,
    payloadAnswer: data.payload_answer,
  };
});
export type TrueFalseQUestion = z.infer<typeof TrueFalseQuestionSchema>;

export const CodeCompletionQuestionSchema = QuestionBaseSchema.extend({
  payload_question: CodeCompletionPayloadQuestionSchema,
}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return {
    ...base,
    payloadQuestion: data.payload_question,
  };
});
export type CodeCompletionQUestion = z.infer<typeof CodeCompletionQuestionSchema>;

export const FlipCardQuestionSchema = QuestionBaseSchema.extend({
  payload_question: FlipCardPayloadQuestionSchema,
}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return {
    ...base,
    payloadQuestion: data.payload_question,
  };
});
export type FlipCardQUestion = z.infer<typeof FlipCardQuestionSchema>;

export const BigOQuestionSchema = QuestionBaseSchema.extend({
  payload_question: BigOWPayloadQuestionSchema,
}).transform((data) => {
  const base = mapQuestionBaseFields(data);

  return {
    ...base,
    payloadQuestion: data.payload_question,
  };
});
export type BigOQuestion = z.infer<typeof BigOQuestionSchema>;

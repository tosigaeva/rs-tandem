import {
  BigOPayloadAnswer,
  BigOPayloadQuestion,
  CodeCompletionPayloadAnswer,
  CodeCompletionPayloadQuestion,
  FlipCardPayloadQuestion,
  QuizPayloadAnswer,
  QuizPayloadQuestion,
  TrueFalsePayloadAnswer,
  TrueFalsePayloadQuestion,
} from '@/types/schemas/question-payload-schema';
import { WidgetType } from '@/types/widget';

export type WidgetQuestionPayloadMap = {
  [WidgetType.Quiz]: QuizPayloadQuestion;
  [WidgetType.TrueFalse]: TrueFalsePayloadQuestion;
  [WidgetType.CodeCompletion]: CodeCompletionPayloadQuestion;
  [WidgetType.FlipCard]: FlipCardPayloadQuestion;
  [WidgetType.BigONotation]: BigOPayloadQuestion;
};

export type WidgetAnswerPayloadMap = {
  [WidgetType.Quiz]: QuizPayloadAnswer;
  [WidgetType.TrueFalse]: TrueFalsePayloadAnswer;
  [WidgetType.CodeCompletion]: CodeCompletionPayloadAnswer;
  [WidgetType.FlipCard]: null;
  [WidgetType.BigONotation]: BigOPayloadAnswer;
};

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayloadQuestion;
  [WidgetType.TrueFalse]: TrueFalsePayloadQuestion;
  [WidgetType.CodeCompletion]: CodeCompletionPayloadQuestion;
  [WidgetType.FlipCard]: FlipCardPayloadQuestion;
  [WidgetType.BigONotation]: BigOPayloadQuestion;
};

export type AnswerPayload = WidgetAnswerPayloadMap[WidgetType];

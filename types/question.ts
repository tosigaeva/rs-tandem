import { BigOPayload, BigOWidget } from '@/components/library/widget/ui/big-o-widget/type';
import {
  CodeCompletionPayload,
  CodeCompletionWidget,
} from '@/components/library/widget/ui/code-completion-widget/type';
import { FlipCardPayload, FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { QuizPayload, QuizWidget } from '@/components/library/widget/ui/quiz-widget/type';
import { TrueFalsePayload, TrueFalseWidget } from '@/components/library/widget/ui/true-false-widget/type';
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

export type QuestionPayload = QuizPayload | TrueFalsePayload | CodeCompletionPayload | FlipCardPayload | BigOPayload;
export type QuestionWidget = QuizWidget | TrueFalseWidget | CodeCompletionWidget | FlipCardWidget | BigOWidget;

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
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
  [WidgetType.FlipCard]: FlipCardPayload;
  [WidgetType.BigONotation]: BigOPayload;
};

export type AnswerPayload = WidgetAnswerPayloadMap[WidgetType];

export type BaseQuestion = {
  id: string;
  topicId: string;
};
export type Question = BaseQuestion & QuestionWidget;

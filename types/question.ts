import { BigOWidget } from '@/components/library/widget/ui/big-o-widget/type';
import {
  CodeCompletionPayload,
  CodeCompletionWidget,
} from '@/components/library/widget/ui/code-completion-widget/type';
import { FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { QuizPayload, QuizWidget } from '@/components/library/widget/ui/quiz-widget/type';
import { TrueFalsePayload, TrueFalseWidget } from '@/components/library/widget/ui/true-false-widget/type';
import { WidgetType } from '@/types/widget';

import { BigOPayloadQuestion, FlipCardPayloadQuestion } from './schemas/question-payload-schema';

export type QuestionPayload =
  | QuizPayload
  | TrueFalsePayload
  | CodeCompletionPayload
  | FlipCardPayloadQuestion
  | BigOPayloadQuestion;
export type QuestionWidget = QuizWidget | TrueFalseWidget | CodeCompletionWidget | FlipCardWidget | BigOWidget;

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
  [WidgetType.FlipCard]: FlipCardPayloadQuestion;
  [WidgetType.BigONotation]: BigOPayloadQuestion;
};

export type BaseQuestion = {
  id: string;
  topicId: string;
};
export type Question = BaseQuestion & QuestionWidget;

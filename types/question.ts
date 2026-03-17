import { BigOPayload, BigOWidget } from '@/components/library/widget/ui/big-o-widget/type';
import {
  CodeCompletionPayload,
  CodeCompletionWidget,
} from '@/components/library/widget/ui/code-completion-widget/type';
import { FlipCardPayload, FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { QuizPayload, QuizWidget } from '@/components/library/widget/ui/quiz-widget/type';
import { TrueFalsePayload, TrueFalseWidget } from '@/components/library/widget/ui/true-false-widget/type';
import { WidgetType } from '@/types/widget';

export type QuestionPayload = QuizPayload | TrueFalsePayload | CodeCompletionPayload | FlipCardPayload | BigOPayload;
export type QuestionWidget = QuizWidget | TrueFalseWidget | CodeCompletionWidget | FlipCardWidget | BigOWidget;

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
  [WidgetType.FlipCard]: FlipCardPayload;
  [WidgetType.BigONotation]: BigOPayload;
};

export type BaseQuestion = {
  id: string;
  topicId: string;
};
export type Question = BaseQuestion & QuestionWidget;

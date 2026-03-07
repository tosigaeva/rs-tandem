import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import { WidgetType } from '@/types/widget';

export type QuestionPayload = QuizPayload | TrueFalsePayload | CodeCompletionPayload;

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
};

export type Question<T extends WidgetType = WidgetType> = {
  id: string;
  topicId: string;
  type: T;
  payload: WidgetPayloadMap[T];
};

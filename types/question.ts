import { AsyncSorterPayload, AsyncSorterWidget } from '@/components/library/widget/ui/async-sorter/type';
import { BigOWidget } from '@/components/library/widget/ui/big-o-widget/type';
import {
  CodeCompletionPayload,
  CodeCompletionWidget,
} from '@/components/library/widget/ui/code-completion-widget/type';
import { CodeOrderingPayload, CodeOrderingWidget } from '@/components/library/widget/ui/code-ordering/type';
import { FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { QuizPayload, QuizWidget } from '@/components/library/widget/ui/quiz-widget/type';
import { TrueFalsePayload, TrueFalseWidget } from '@/components/library/widget/ui/true-false-widget/type';
import {
  AsyncSorterPayloadAnswer,
  AsyncSorterPayloadQuestion,
  BigOPayloadAnswer,
  BigOPayloadQuestion,
  CodeCompletionPayloadAnswer,
  CodeCompletionPayloadQuestion,
  CodeOrderingPayloadAnswer,
  FlipCardPayloadQuestion,
  QuizPayloadAnswer,
  QuizPayloadQuestion,
  TrueFalsePayloadAnswer,
  TrueFalsePayloadQuestion,
} from '@/types/schemas/question-payload-schema';
import { CodeOrderingQuestion } from '@/types/schemas/question-schemas';
import { WidgetType } from '@/types/widget';

export type QuestionPayload =
  | QuizPayload
  | TrueFalsePayload
  | CodeCompletionPayload
  | FlipCardPayloadQuestion
  | BigOPayloadQuestion
  | CodeOrderingPayload
  | AsyncSorterPayload;
export type QuestionWidget =
  | QuizWidget
  | TrueFalseWidget
  | CodeCompletionWidget
  | FlipCardWidget
  | BigOWidget
  | CodeOrderingWidget
  | AsyncSorterWidget;

export type WidgetQuestionPayloadMap = {
  [WidgetType.Quiz]: QuizPayloadQuestion;
  [WidgetType.TrueFalse]: TrueFalsePayloadQuestion;
  [WidgetType.CodeCompletion]: CodeCompletionPayloadQuestion;
  [WidgetType.FlipCard]: FlipCardPayloadQuestion;
  [WidgetType.BigONotation]: BigOPayloadQuestion;
  [WidgetType.CodeOrdering]: CodeOrderingQuestion;
  [WidgetType.AsyncSorter]: AsyncSorterPayloadQuestion;
};

export type WidgetAnswerPayloadMap = {
  [WidgetType.Quiz]: QuizPayloadAnswer;
  [WidgetType.TrueFalse]: TrueFalsePayloadAnswer;
  [WidgetType.CodeCompletion]: CodeCompletionPayloadAnswer;
  [WidgetType.FlipCard]: null;
  [WidgetType.BigONotation]: BigOPayloadAnswer;
  [WidgetType.CodeOrdering]: CodeOrderingPayloadAnswer;
  [WidgetType.AsyncSorter]: AsyncSorterPayloadAnswer;
};

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
  [WidgetType.FlipCard]: FlipCardPayloadQuestion;
  [WidgetType.BigONotation]: BigOPayloadQuestion;
  [WidgetType.CodeOrdering]: CodeOrderingPayload;
  [WidgetType.AsyncSorter]: AsyncSorterPayload;
};

export type AnswerPayload = WidgetAnswerPayloadMap[WidgetType];

export type BaseQuestion = {
  id: string;
  topicId: string;
};
export type Question = BaseQuestion & QuestionWidget;

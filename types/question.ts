import { CodeCompletionPayload, CodeCompletionWidget } from '@/components/library/widget/code-completion-widget/type';
import { QuizPayload, QuizWidget } from '@/components/library/widget/quiz-widget/type';
import { TrueFalsePayload, TrueFalseWidget } from '@/components/library/widget/true-false-widget/type';
import { WidgetType } from '@/types/widget';

export type QuestionPayload = QuizPayload | TrueFalsePayload | CodeCompletionPayload;
export type QuestionWidget = QuizWidget | TrueFalseWidget | CodeCompletionWidget;

export type Question = {
  id: string;
  topicId: string;
} & QuestionWidget;

export type QuizResponse = {
  type: WidgetType.Quiz;
  payload: {
    question: string;
    options: string[];
  };
};

export type TrueFalseResponse = {
  type: WidgetType.TrueFalse;
  payload: {
    statement: string;
    explanation: string;
  };
};

export type CodeCompletionResponse = {
  type: WidgetType.CodeCompletion;
  payload: {
    code: string;
    blanks: string[];
    hints: string[];
  };
};

export type QuestionResponse = {
  id: string;
  topicId: string;
} & (QuizResponse | TrueFalseResponse | CodeCompletionResponse);
export type QuestionsResponse = QuestionResponse[];

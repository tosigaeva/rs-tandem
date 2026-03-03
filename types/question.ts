import { QuizPayload, QuizWidget } from '@/components/library/widget/quiz-widget/type';

export type QuestionPayload = QuizPayload;
export type QuestionWidget = QuizWidget;

export type Question = {
  id: string;
  topicId: string;
  version: number;
  difficulty: number;
  tags: string[];
} & QuestionWidget;

export type QuizResponse = {
  type: 'quiz';
  payload: {
    question: Record<string, string>;
    options: Record<string, string>[];
  };
};

export type TrueFalseResponse = {
  type: 'true-false';
  payload: {
    statement: Record<string, string>;
    explanation: Record<string, string>;
  };
};

export type CodeCompletionResponse = {
  type: 'code-completion';
  payload: {
    code: string;
    blanks: string[];
    hints: Record<string, string>[];
  };
};

export type QuestionResponse = {
  id: string;
  topicId: string;
  version: number;
  difficulty: number;
  tags: string[];
} & (QuizResponse | TrueFalseResponse | CodeCompletionResponse);
export type QuestionsResponse = QuestionResponse[];

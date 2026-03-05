import { WidgetType } from '@/types/widget';

export type QuizPayload = {
  question: string;
  options: string[];
};

export type QuizWidget = {
  type: WidgetType.Quiz;
  payload: QuizPayload;
};

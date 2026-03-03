import { Locale } from '@/types/locale';
import { WidgetType } from '@/types/widget';

export type QuizPayload = {
  question: Record<Locale, string>;
  options: Record<Locale, string>[];
};
export type QuizWidget = {
  type: WidgetType.Quiz;
  payload: QuizPayload;
};

import { Locale } from '@/types/locale';
import { WidgetType } from '@/types/widget';

export type CodeCompletionPayload = {
  code: string;
  blanks: string[];
  hints: Record<Locale, string>[];
};

export type CodeCompletionWidget = {
  type: WidgetType.CodeCompletion;
  payload: CodeCompletionPayload;
};

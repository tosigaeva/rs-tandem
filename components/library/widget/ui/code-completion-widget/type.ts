import { WidgetType } from '@/types/widget';

export type CodeCompletionPayload = {
  code: string;
  blanks: string[];
  hints?: string[] | null;
};

export type CodeCompletionWidget = {
  type: WidgetType.CodeCompletion;
  payload: CodeCompletionPayload;
};

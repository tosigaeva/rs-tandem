import { WidgetType } from '@/types/widget';

export type CodeOrderingPayload = {
  description: string;
  lines: string[];
};

export type CodeOrderingWidget = {
  type: WidgetType.CodeOrdering;
  payload: CodeOrderingPayload;
};

import { WidgetType } from '@/types/widget';

export type BigOPayload = {
  question: string;
  codeExample: string;
  answer: string;
};

export type BigOWidget = {
  type: WidgetType.BigONotation;
  payload: BigOPayload;
};

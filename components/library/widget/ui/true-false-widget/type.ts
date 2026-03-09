import { WidgetType } from '@/types/widget';

export type TrueFalsePayload = {
  statement: string;
  explanation: string;
};

export type TrueFalseWidget = {
  type: WidgetType.TrueFalse;
  payload: TrueFalsePayload;
};

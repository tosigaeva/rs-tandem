import { WidgetType } from '@/types/widget';

export type FlipCardPayload = {
  question: string;
};

export type FlipCardWidget = {
  type: WidgetType.FlipCard;
  payload: FlipCardPayload;
};

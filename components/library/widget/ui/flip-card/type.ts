import { WidgetType } from '@/types/widget';

export type FlipCardPayload = {
  term: string;
  definition: string;
};

export type FlipCardWidget = {
  type: WidgetType.FlipCard;
  payload: FlipCardPayload;
};

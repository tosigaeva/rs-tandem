import { FlipCardPayloadQuestion } from '@/types/schemas/question-payload-schema';
import { WidgetType } from '@/types/widget';

export type FlipCardWidget = {
  type: WidgetType.FlipCard;
  payload: FlipCardPayloadQuestion;
};

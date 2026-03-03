import { Locale } from '@/types/locale';
import { WidgetType } from '@/types/widget';

export type TrueFalsePayload = {
  statement: Record<Locale, string>;
  explanation: Record<Locale, string>;
};

export type TrueFalseWidget = {
  type: WidgetType.TrueFalse;
  payload: TrueFalsePayload;
};

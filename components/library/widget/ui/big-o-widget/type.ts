import { LocaleString } from '@/types/schemas/locale-schemas';
import { BigOPayloadQuestion } from '@/types/schemas/question-payload-schema';
import { WidgetType } from '@/types/widget';

export type BigOWidget = {
  type: WidgetType.BigONotation;
  payload: BigOPayloadQuestion;
};

export type Complexity = {
  name: string;
  func: (n: number) => number;
};

export type BigOCanvasProperties = {
  question: LocaleString;
  codeExample: string;
  selectedComplexity?: string;
  onSelect: (complexity: string) => void;
  onSubmit: () => void;
  isCorrect?: boolean;
  isSubmitted?: boolean;
};

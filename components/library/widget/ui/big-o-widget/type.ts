import { WidgetType } from '@/types/widget';

export type BigOPayload = {
  question: string;
  codeExample: string;
};

export type BigOWidget = {
  type: WidgetType.BigONotation;
  payload: BigOPayload;
};

export type Complexity = {
  name: string;
  func: (n: number) => number;
};

export type BigOCanvasProperties = {
  question: string;
  codeExample: string;
  selectedComplexity?: string;
  onSelect: (complexity: string) => void;
  onSubmit: () => void;
  isCorrect?: boolean;
  isSubmitted?: boolean;
};

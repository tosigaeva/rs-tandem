export enum WidgetType {
  Quiz = 'quiz',
  TrueFalse = 'true-false',
  CodeCompletion = 'code-completion',
  FlipCard = 'flip-card',
}

export type Widget = {
  type: WidgetType;
  title: string;
  description: string;
  icon: string;
};

const WIDGET_TYPE_SET = new Set<string>(Object.values(WidgetType));

export function isWidgetType(value: string | undefined): value is WidgetType {
  return value !== undefined && WIDGET_TYPE_SET.has(value);
}

export function toWidgetType(value: string | undefined): WidgetType | undefined {
  return isWidgetType(value) ? value : undefined;
}

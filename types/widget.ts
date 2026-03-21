export enum WidgetType {
  Quiz = 'quiz',
  TrueFalse = 'true-false',
  CodeCompletion = 'code-completion',
  FlipCard = 'flip-card',
  BigONotation = 'big-o',
  AsyncSorter = 'async-sorter',
}

export type Widget = {
  type: WidgetType;
  title: string;
  description: string;
  icon: string;
};

export type AllWidget = {
  type: 'all';
  title: string;
  description: string;
  icon: string;
};

export type WidgetFilter = WidgetType | 'all';

const WIDGET_TYPE_SET = new Set<string>(Object.values(WidgetType));

export function isWidgetType(value: string | undefined): value is WidgetType {
  return value !== undefined && WIDGET_TYPE_SET.has(value);
}

export function toWidgetFilter(value: string | undefined): WidgetFilter | undefined {
  if (value === 'all') return 'all';
  return isWidgetType(value) ? value : undefined;
}

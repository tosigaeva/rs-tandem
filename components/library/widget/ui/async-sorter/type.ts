import { WidgetType } from '@/types/widget';

export type AsyncSorterBlock = {
  id: string;
  code: string;
  label: string;
};

export type AsyncSorterPayload = {
  codeSnippet: string;
  blocks: AsyncSorterBlock[];
};

export type AsyncSorterWidget = {
  type: WidgetType.AsyncSorter;
  payload: AsyncSorterPayload;
};

export type AsyncSorterAnswer = {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
  outputOrder: string[];
};

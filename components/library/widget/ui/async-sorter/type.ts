import { WidgetType } from '@/types/widget';

export type AsyncSorterBlock = {
  id: string;
  code: string;
  label: string;
};

export type AsyncSorterPayload = {
  code: string;
  blocks: AsyncSorterBlock[];
};

export type AsyncSorterWidget = {
  type: WidgetType.AsyncSorter;
  payload: AsyncSorterPayload;
};

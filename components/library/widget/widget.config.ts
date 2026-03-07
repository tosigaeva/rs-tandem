import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { WidgetPayloadMap } from '@/types/question';
import { WidgetType } from '@/types/widget';

export type WidgetSkinsMap = {
  [WidgetType.Quiz]: 'default';
  [WidgetType.TrueFalse]: 'default';
  [WidgetType.CodeCompletion]: 'default';
};

type WidgetComponentProperties<T extends WidgetType = WidgetType> = {
  questionId: string;
  questionPayload: WidgetPayloadMap[T];
  onCheck: (questionId: string, answer: string) => Promise<void>;
};
export type WidgetComponent<T extends WidgetType = WidgetType> = ComponentType<WidgetComponentProperties<T>>;
export const widgetRegistry: {
  [K in WidgetType]?: {
    [S in WidgetSkinsMap[K]]: WidgetComponent<K>;
  };
} = {};
widgetRegistry[WidgetType.Quiz] = {
  default: dynamic<WidgetComponentProperties<WidgetType.Quiz>>(
    () => import('@/components/library/widget/ui/quiz-widget/DefaultComponent')
  ),
};
widgetRegistry[WidgetType.TrueFalse] = {
  default: dynamic<WidgetComponentProperties<WidgetType.TrueFalse>>(
    () => import('@/components/library/widget/ui/true-false-widget/DefaultComponent')
  ),
};
widgetRegistry[WidgetType.CodeCompletion] = {
  default: dynamic<WidgetComponentProperties<WidgetType.CodeCompletion>>(
    () => import('@/components/library/widget/ui/code-completion-widget/DefaultComponent')
  ),
};

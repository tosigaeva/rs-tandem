import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { WidgetPayloadMap } from '@/types/question';
import { WidgetType } from '@/types/widget';

export type WidgetSkinsMap = {
  [WidgetType.Quiz]: 'default';
  [WidgetType.TrueFalse]: 'default';
  [WidgetType.CodeCompletion]: 'default';
  [WidgetType.FlipCard]: 'default';
  [WidgetType.BigONotation]: 'default';
  [WidgetType.AsyncSorter]: 'default';
};

type WidgetComponentProperties<T extends WidgetType = WidgetType> = {
  questionId: string;
  questionPayload: WidgetPayloadMap[T];
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};
export type WidgetComponent<T extends WidgetType = WidgetType> = ComponentType<WidgetComponentProperties<T>>;
export const widgetRegistry: {
  [K in WidgetType]: {
    [S in WidgetSkinsMap[K]]: WidgetComponent<K>;
  };
} = {
  [WidgetType.Quiz]: {
    default: dynamic<WidgetComponentProperties<WidgetType.Quiz>>(
      () => import('@/components/library/widget/ui/quiz-widget/DefaultComponent')
    ),
  },
  [WidgetType.TrueFalse]: {
    default: dynamic<WidgetComponentProperties<WidgetType.TrueFalse>>(
      () => import('@/components/library/widget/ui/true-false-widget/DefaultComponent')
    ),
  },
  [WidgetType.CodeCompletion]: {
    default: dynamic<WidgetComponentProperties<WidgetType.CodeCompletion>>(
      () => import('@/components/library/widget/ui/code-completion-widget/DefaultComponent')
    ),
  },
  [WidgetType.FlipCard]: {
    default: dynamic<WidgetComponentProperties<WidgetType.FlipCard>>(
      () => import('@/components/library/widget/ui/flip-card/FlipCard')
    ),
  },
  [WidgetType.BigONotation]: {
    default: dynamic<WidgetComponentProperties<WidgetType.BigONotation>>(
      () => import('@/components/library/widget/ui/big-o-widget/DefaultComponent')
    ),
  },
  [WidgetType.AsyncSorter]: {
    default: dynamic<WidgetComponentProperties<WidgetType.AsyncSorter>>(
      () => import('@/components/library/widget/ui/async-sorter/DefaultComponent')
    ),
  },
};

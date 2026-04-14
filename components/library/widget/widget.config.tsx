import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { WidgetPayloadMap } from '@/types/question';
import { ValidationResult } from '@/types/validation';
import { WidgetType } from '@/types/widget';

import { WidgetSkeleton } from './widget.skeleton';

export type WidgetSkinsMap = {
  [WidgetType.Quiz]: 'default';
  [WidgetType.TrueFalse]: 'default';
  [WidgetType.CodeCompletion]: 'default';
  [WidgetType.FlipCard]: 'default';
  [WidgetType.BigONotation]: 'default';
  [WidgetType.CodeOrdering]: 'default';
  [WidgetType.AsyncSorter]: 'default';
};

type WidgetComponentProperties<T extends WidgetType = WidgetType> = {
  questionId: number;
  questionPayload: WidgetPayloadMap[T];
  onCheck: (answer: unknown) => Promise<ValidationResult>;
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
      () => import('@/components/library/widget/ui/quiz-widget/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.TrueFalse]: {
    default: dynamic<WidgetComponentProperties<WidgetType.TrueFalse>>(
      () => import('@/components/library/widget/ui/true-false-widget/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.CodeCompletion]: {
    default: dynamic<WidgetComponentProperties<WidgetType.CodeCompletion>>(
      () => import('@/components/library/widget/ui/code-completion-widget/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.FlipCard]: {
    default: dynamic<WidgetComponentProperties<WidgetType.FlipCard>>(
      () => import('@/components/library/widget/ui/flip-card/FlipCard'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.BigONotation]: {
    default: dynamic<WidgetComponentProperties<WidgetType.BigONotation>>(
      () => import('@/components/library/widget/ui/big-o-widget/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.CodeOrdering]: {
    default: dynamic<WidgetComponentProperties<WidgetType.CodeOrdering>>(
      () => import('@/components/library/widget/ui/code-ordering/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
  [WidgetType.AsyncSorter]: {
    default: dynamic<WidgetComponentProperties<WidgetType.AsyncSorter>>(
      () => import('@/components/library/widget/ui/async-sorter/DefaultComponent'),
      {
        loading: () => <WidgetSkeleton />,
      }
    ),
  },
};

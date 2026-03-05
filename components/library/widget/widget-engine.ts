import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { CodeCompletionPayload } from '@/components/library/widget/code-completion-widget/type';
import { QuizPayload } from '@/components/library/widget/quiz-widget/type';
import { TrueFalsePayload } from '@/components/library/widget/true-false-widget/type';
import { WidgetType } from '@/types/widget';

export type WidgetPayloadMap = {
  [WidgetType.Quiz]: QuizPayload;
  [WidgetType.TrueFalse]: TrueFalsePayload;
  [WidgetType.CodeCompletion]: CodeCompletionPayload;
};

type WidgetComponentProperties<T extends WidgetType = WidgetType> = {
  questionPayload: WidgetPayloadMap[T];
  onCheck: () => void;
};

export type WidgetComponent<T extends WidgetType = WidgetType> = ComponentType<WidgetComponentProperties<T>>;
export const widgets: {
  [K in WidgetType]?: WidgetComponent<K>;
} = {};
widgets[WidgetType.Quiz] = dynamic<WidgetComponentProperties<WidgetType.Quiz>>(
  () => import('@/components/library/widget/quiz-widget/Component')
);
widgets[WidgetType.TrueFalse] = dynamic(() => import('@/components/library/widget/true-false-widget/Component'));
widgets[WidgetType.CodeCompletion] = dynamic(
  () => import('@/components/library/widget/code-completion-widget/Component')
);

export function getWidgetComponent<T extends WidgetType>(widgetType: T): WidgetComponent<T> {
  const Component: WidgetComponent<T> | undefined = widgets[widgetType];

  if (Component === undefined) {
    throw new Error(`Unknown widget type: ${widgetType}`);
  }

  return Component;
}

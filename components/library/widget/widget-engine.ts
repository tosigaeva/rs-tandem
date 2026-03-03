import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { QuestionPayload } from '@/types/question';
import { WidgetType } from '@/types/widget';

type WidgetComponentProperties = {
  questionPayload: QuestionPayload;
};
export type WidgetComponent = ComponentType<WidgetComponentProperties>;

export const widgets = new Map<WidgetType, WidgetComponent>();
widgets.set(
  WidgetType.Quiz,
  dynamic<WidgetComponentProperties>(() => import('@/components/library/widget/quiz-widget/component'))
);

export function getWidgetComponent(widgetType: WidgetType): WidgetComponent {
  const Component: WidgetComponent | undefined = widgets.get(widgetType);

  if (Component === undefined) {
    throw new Error(`Unknown widget type: ${widgetType}`);
  }

  return Component;
}

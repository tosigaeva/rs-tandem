import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { QuizWidget } from '@/components/library/widget/quiz-widget/type';
import { WidgetType } from '@/types/widget';

type Widget = QuizWidget;
type WidgetComponentProperties = {
  widget: Widget;
};
export type WidgetComponent = ComponentType<WidgetComponentProperties>;

export const widgets = new Map<WidgetType, WidgetComponent>();
widgets.set(
  WidgetType.Quiz,
  dynamic<WidgetComponentProperties>(() => import('@/components/library/widget/quiz-widget/component'))
);

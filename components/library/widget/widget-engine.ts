import {WidgetType} from "@/types/widget";
import {quizStrategy, QuizWidget} from "@/components/library/widget/quiz-widget";

type Widget =
  | QuizWidget

export interface WidgetStrategy<T extends Widget, A> {
  type: T["type"];
  render(widget: T, onAnswer: (answer: A) => void): void;
  validate(answer: A): boolean;
}

const strategies = new Map<WidgetType, WidgetStrategy<any, any>>();
strategies.set(WidgetType.Quiz, quizStrategy);

import { ComponentType } from "react";
import dynamic from "next/dynamic";
export type WidgetComponent = ComponentType<any>;
type WidgetLoader = () => Promise<{ default: WidgetComponent }>;
export const widgetLoaders = new Map<WidgetType, WidgetLoader>();
widgetLoaders.set(
  WidgetType.Quiz,
  () => import("@/components/library/widget/quiz-widget")
);

export const widgets = new Map<WidgetType, any>();
widgets.set(
  WidgetType.Quiz,
  dynamic(() => import("@/components/library/widget/quiz-widget"))
);

export function renderWidget(widget: Widget, onAnswer: (answer: unknown) => void) {
  const strategy = strategies.get(widget.type);
  if (!strategy) {
    throw new Error(`Unknown widget type: ${widget.type}`);
  }
  return strategy.render(widget, onAnswer);
}
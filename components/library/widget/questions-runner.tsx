'use client';

import { useState } from 'react';

import Question from '@/components/library/widget/question';
import { WidgetComponent, widgets } from '@/components/library/widget/widget-engine';
import { Question as QuesionType } from '@/types/question';
import { Widget, WidgetType } from '@/types/widget';

type WidgetListProperties = {
  questions: QuesionType[];
  widgets?: Widget[];
};

export default function QuestionsRunner({ questions }: WidgetListProperties) {
  const [question] = useState(questions[0]);

  const Component: WidgetComponent | undefined = widgets.get(question.type);
  if (Component === undefined) {
    throw new Error(`Unknown widget type: ${question.type}`);
  }

  if (question.type !== WidgetType.Quiz) {
    throw new Error(`Unsupported question type: ${question.type}`);
  }

  return (
    <section>
      <Question question={question} Component={Component}></Question>
    </section>
  );
}

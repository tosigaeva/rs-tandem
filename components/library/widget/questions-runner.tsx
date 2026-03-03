'use client';

import { useState } from 'react';

import Question from '@/components/library/widget/question';
import { getWidgetComponent } from '@/components/library/widget/widget-engine';
import { Question as QuestionType } from '@/types/question';
import { Widget } from '@/types/widget';

type WidgetListProperties = {
  questions: QuestionType[];
  widgets?: Widget[];
};

export default function QuestionsRunner({ questions }: WidgetListProperties) {
  const [question] = useState(questions[0]);

  return (
    <section>
      <Question question={question} Component={getWidgetComponent(question.type)}></Question>
    </section>
  );
}

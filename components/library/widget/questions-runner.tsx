'use client';

import { useState } from 'react';

import Question from '@/components/library/widget/question';
import { getWidgetComponent } from '@/components/library/widget/widget-engine';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export default function QuestionsRunner({ questions }: QuestionsRunnerProperties) {
  const [currentQuestion] = useState(questions[0]);

  return (
    <section>
      <Question questionPayload={currentQuestion.payload} Component={getWidgetComponent(currentQuestion.type)} />
    </section>
  );
}

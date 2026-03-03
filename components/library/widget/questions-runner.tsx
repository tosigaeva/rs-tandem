'use client';

import { useState } from 'react';

import Question from '@/components/library/widget/question';
import { getWidgetComponent } from '@/components/library/widget/widget-engine';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export default function QuestionsRunner({ questions }: QuestionsRunnerProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFinished = currentIndex >= questions.length;

  const onCheck = () => {
    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  if (isFinished) return <div>Results</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <section>
      <Question
        questionPayload={currentQuestion.payload}
        Component={getWidgetComponent(currentQuestion.type)}
        onCheck={onCheck}
      />
    </section>
  );
}

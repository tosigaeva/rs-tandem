'use client';

import { useState } from 'react';

import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export default function QuestionsRunner({ questions }: QuestionsRunnerProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFinished = currentIndex >= questions.length;

  const onCheck = async (p: boolean | undefined) => {
    console.log('verdict validateQuestion', p);
    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  if (isFinished) return <div>Results</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <section>
      <QuestionWrapper
        questionId={currentQuestion.id}
        questionPayload={currentQuestion.payload}
        WidgetComponent={getWidgetComponent(currentQuestion.type)}
        onCheck={onCheck}
      />
    </section>
  );
}

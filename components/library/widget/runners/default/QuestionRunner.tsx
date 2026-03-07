'use client';

import { useState } from 'react';

import { validateQuestion } from '@/api/validation.api';
import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export default function QuestionsRunner({ questions }: QuestionsRunnerProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFinished = currentIndex >= questions.length;

  const onCheck = async (questionId: string, answer: string) => {
    const verdict = validateQuestion(questionId, answer);
    console.log('verdict validateQuestion', verdict);
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

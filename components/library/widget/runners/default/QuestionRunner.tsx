'use client';

import { useState } from 'react';

import { validateAnswer } from '@/api/trainer.api';
import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export default function QuestionsRunner({ questions }: QuestionsRunnerProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  if (currentQuestion === undefined) return <div>Results</div>;

  const onCheck = async (answer: string) => {
    console.log('Selected raw answer in runner:', answer);
    const result = await validateAnswer(currentQuestion.id, answer);
    console.log(result);
    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  return (
    <section>
      <QuestionWrapper
        questionPayload={currentQuestion.payload}
        WidgetComponent={getWidgetComponent(currentQuestion.type)}
        onCheck={onCheck}
      />
    </section>
  );
}

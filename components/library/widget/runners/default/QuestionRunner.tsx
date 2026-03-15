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

  const nextQuestion = () => setCurrentIndex((previousIndex) => previousIndex + 1);

  const onCheck = async (answer: string) => {
    return await validateAnswer(currentQuestion.id, answer);
  };

  return (
    <section>
      <QuestionWrapper
        questionId={currentQuestion.id}
        questionPayload={currentQuestion.payload}
        WidgetComponent={getWidgetComponent(currentQuestion.type)}
        onCheck={onCheck}
        onNext={nextQuestion}
      />
    </section>
  );
}

'use client';

import { useState } from 'react';

import { trackQuestionAttempt } from '@/api/activity.client';
import { validateAnswer } from '@/api/validate.api';
import { Question as QuestionType } from '@/types/question';

type RunnerRenderProperties = {
  questions: QuestionType[];
  currentIndex: number;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  nextQuestion: () => void;
};

type QuestionRunnerEngineProperties = {
  questions: QuestionType[];
  children: (properties: RunnerRenderProperties) => React.ReactNode;
};

export default function QuestionRunnerEngine({ questions, children }: QuestionRunnerEngineProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  if (currentQuestion === undefined) return <div>Results</div>;

  const nextQuestion = () => setCurrentIndex((previousIndex) => previousIndex + 1);

  const onCheck = async (answer: string) => {
    const result = await validateAnswer(currentQuestion.id, answer);

    await trackQuestionAttempt({
      questionId: currentQuestion.id,
      isSuccess: result,
    }).catch((error: unknown) => {
      console.error('Track activity failed', error);
    });

    return result;
  };

  return children({
    questions,
    currentIndex,
    onCheck,
    nextQuestion,
  });
}

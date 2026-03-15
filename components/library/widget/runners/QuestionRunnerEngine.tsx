'use client';

import { useState } from 'react';

import { validateAnswer } from '@/api/trainer.api';
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
    return await validateAnswer(currentQuestion.id, answer);
  };

  return children({
    questions,
    currentIndex,
    onCheck,
    nextQuestion,
  });
}

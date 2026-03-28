'use client';

import { useState } from 'react';

import Results from '@/components/Results';
import { trackQuestionAttempt } from '@/data/activity.client';
import { validateAnswer } from '@/data/validate.api';
import { Question as QuestionType } from '@/types/question';

type RunnerRenderProperties = {
  questions: QuestionType[];
  currentIndex: number;
  onCheck: (answer: unknown) => Promise<boolean | undefined>;
  nextQuestion: () => void;
};

type QuestionRunnerEngineProperties = {
  questions: QuestionType[];
  children: (properties: RunnerRenderProperties) => React.ReactNode;
};

export default function QuestionRunnerEngine({ questions, children }: QuestionRunnerEngineProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => setCurrentIndex((previousIndex) => previousIndex + 1);

  const startOver = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
  };

  const onCheck = async (answer: unknown) => {
    const result = await validateAnswer(currentQuestion.id, answer);

    if (result === true) setCorrectAnswers((previous) => previous + 1);

    try {
      await trackQuestionAttempt({
        questionId: currentQuestion.id,
        isSuccess: result,
      });
    } catch {
      // ignored due to not blocking answer validation flow.
    }

    return result;
  };

  if (currentQuestion === undefined) {
    return <Results questionsCount={questions.length} correctAnswers={correctAnswers} onStartOver={startOver} />;
  }

  return children({
    questions,
    currentIndex,
    onCheck,
    nextQuestion,
  });
}

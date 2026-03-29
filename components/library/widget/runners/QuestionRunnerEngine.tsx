'use client';

import { useState } from 'react';

import Results from '@/components/Results';
import { trackQuestionAttempt } from '@/data/activity.action';
import { validateAnswer } from '@/data/validate.api';
import { Question as QuestionType } from '@/types/question';

export type AnswersHistory = (boolean | undefined)[];

type RunnerRenderProperties = {
  questions: QuestionType[];
  currentIndex: number;
  answersHistory: AnswersHistory;
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
  const [answersHistory, setAnswersHistory] = useState<AnswersHistory>(
    Array.from<undefined>({ length: questions.length })
  );

  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => setCurrentIndex((previousIndex) => previousIndex + 1);

  const startOver = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setAnswersHistory(Array.from<undefined>({ length: questions.length }));
  };

  const onCheck = async (answer: unknown) => {
    const result = await validateAnswer(currentQuestion.id, answer);

    if (result === true) setCorrectAnswers((previous) => previous + 1);

    setAnswersHistory((previous) => {
      const copyHistory = [...previous];
      copyHistory[currentIndex] = result;
      return copyHistory;
    });

    try {
      await trackQuestionAttempt({
        questionId: currentQuestion.id,
        isSuccess: result,
      });
    } catch {
      // ignored due to not blocking an answer validation flow.
    }

    return result;
  };

  if (currentQuestion === undefined) {
    return <Results questionsCount={questions.length} correctAnswers={correctAnswers} onStartOver={startOver} />;
  }

  return children({
    questions,
    currentIndex,
    answersHistory,
    onCheck,
    nextQuestion,
  });
}

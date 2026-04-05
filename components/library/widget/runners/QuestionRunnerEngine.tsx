'use client';

import { LoaderIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import Results from '@/components/Results';
import { trackQuestionAttempt } from '@/data/activity.action';
import { validateAnswer } from '@/data/validate.api';
import { useAuth } from '@/providers/auth-state.provider';
import { QuestionInfo } from '@/types/schemas/question-schemas';
import { ValidationResult } from '@/types/validation';

export type AnswersHistory = (boolean | undefined)[];

type RunnerRenderProperties = {
  questions: QuestionInfo[];
  currentIndex: number;
  answersHistory: AnswersHistory;
  isValidating: boolean;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  nextQuestion: () => void;
};

type QuestionRunnerEngineProperties = {
  questions: QuestionInfo[];
  children: (properties: RunnerRenderProperties) => React.ReactNode;
  onComplete: () => void;
};

export default function QuestionRunnerEngine({ questions, children, onComplete }: QuestionRunnerEngineProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<AnswersHistory>(
    Array.from<undefined>({ length: questions.length })
  );
  const isValidationInFlight = useRef(false);
  const correctAnswers = answersHistory.filter(Boolean).length;

  const { user } = useAuth();

  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => setCurrentIndex((previousIndex) => previousIndex + 1);

  const startOver = () => {
    onComplete();
    setCurrentIndex(0);
    setAnswersHistory([]);
  };

  const onCheck = async (answer: unknown): Promise<ValidationResult> => {
    if (user == undefined) return { isCorrect: undefined };

    if (isValidationInFlight.current) return { isCorrect: undefined };

    isValidationInFlight.current = true;
    setIsValidating(true);

    try {
      const result = await validateAnswer(currentQuestion.id, answer);

      currentQuestion.isSuccess = result.isCorrect ?? false;
      currentQuestion.updatedAt = new Date();

      setAnswersHistory((previous) => {
        const copyHistory = [...previous];
        copyHistory[currentIndex] = result.isCorrect;
        return copyHistory;
      });

      try {
        await trackQuestionAttempt({
          questionId: currentQuestion.id,
          userId: user.id,
          isSuccess: result.isCorrect,
        });
      } catch {
        // ignored due to not blocking an answer validation flow.
      }

      return result;
    } finally {
      isValidationInFlight.current = false;
      setIsValidating(false);
    }
  };

  if (currentQuestion === undefined) {
    return <Results questionsCount={questions.length} correctAnswers={correctAnswers} onStartOver={startOver} />;
  }

  return (
    <div className="relative">
      {children({
        questions,
        currentIndex,
        answersHistory,
        isValidating,
        onCheck,
        nextQuestion,
      })}

      {isValidating ? (
        <div
          aria-live="polite"
          aria-label="Validating answer"
          className="bg-background/70 absolute inset-0 z-10 flex items-center justify-center rounded-xl backdrop-blur-xs"
        >
          <div className="bg-card text-muted-foreground flex items-center gap-3 rounded-full border px-4 py-3 shadow-sm">
            <LoaderIcon className="size-5 animate-spin" />
            <span className="text-sm font-medium">Validating answer...</span>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

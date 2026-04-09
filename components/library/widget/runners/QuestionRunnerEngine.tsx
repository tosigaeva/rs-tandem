'use client';

import { LoaderIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import Results from '@/components/Results';
import { trackQuestionAttempt } from '@/data/activity.action';
import { validateAnswer } from '@/data/validate.api';
import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/providers/auth-state.provider';
import { QuestionInfo } from '@/types/schemas/question-schemas';
import { ValidationResult } from '@/types/validation';

export type AnswersHistory = (boolean | undefined)[];

type RunnerRenderProperties = {
  questions: QuestionInfo[];
  totalLength: number;
  currentIndex: number;
  answersHistory: AnswersHistory;
  isValidating: boolean;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  nextQuestion: () => void;
};

type QuestionRunnerEngineProperties = {
  questions: QuestionInfo[];
  totalLength: number;
  children: (properties: RunnerRenderProperties) => React.ReactNode;
  onComplete: () => void;
};

export default function QuestionRunnerEngine({
  questions,
  totalLength,
  children,
  onComplete,
}: QuestionRunnerEngineProperties) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<AnswersHistory>(
    Array.from<undefined>({ length: questions.length })
  );
  const isValidationInFlight = useRef(false);
  const correctAnswers = totalLength - questions.length + answersHistory.filter(Boolean).length;

  const { user } = useAuth();

  const { t } = useTranslation();

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
      const result = await validateAnswer(currentQuestion.id, currentQuestion.type, answer);

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
          isSuccess: result.isCorrect,
        });
      } catch {
        toast.error(t('runner.error.could-not-update'));
      }

      return result;
    } catch {
      setAnswersHistory((previous) => {
        const copyHistory = [...previous];
        copyHistory[currentIndex] = false;
        return copyHistory;
      });
      toast.error(t('runner.error.failed-to-validate'));
      return { isCorrect: undefined };
    } finally {
      isValidationInFlight.current = false;
      setIsValidating(false);
    }
  };

  if (currentQuestion === undefined) {
    return <Results questionsCount={totalLength} correctAnswers={correctAnswers} onStartOver={startOver} />;
  }

  return (
    <div className="relative">
      {children({
        questions,
        totalLength,
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

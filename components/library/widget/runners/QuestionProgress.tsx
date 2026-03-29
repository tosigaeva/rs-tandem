import { Flame } from 'lucide-react';
import { useMemo } from 'react';

import { AnswersHistory } from '@/components/library/widget/runners/QuestionRunnerEngine';
import { Progress } from '@/components/ui';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

type QuestionProgressProperties = {
  currentQuestion: number;
  totalQuestions: number;
  answersHistory: AnswersHistory;
};

export function calculateCurrentStreak(answersHistory: AnswersHistory) {
  let currentStreak = 0;
  let maxStreak = 0;

  for (const answer of answersHistory) {
    if (answer === true) {
      currentStreak += 1;
      maxStreak = Math.max(maxStreak, currentStreak);
      continue;
    }

    if (answer === false) {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

export default function QuestionProgress({
  currentQuestion,
  totalQuestions,
  answersHistory,
}: QuestionProgressProperties) {
  const { t } = useTranslation();

  const answeredCount = currentQuestion;
  const progress = (currentQuestion / totalQuestions) * 100;

  const { currentStreak, accuracy, questionStatuses } = useMemo(() => {
    const visibleAnswers = answersHistory.slice(0, currentQuestion);
    const currentStreak = calculateCurrentStreak(visibleAnswers);

    const correctAnswers = visibleAnswers.filter((answer) => answer === true).length;
    const accuracy = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0;

    const questionStatuses = Array.from({ length: totalQuestions }, (_, index) => {
      if (index < currentQuestion) return answersHistory[index];
      if (index === currentQuestion) return 'current';
      return 'pending';
    });

    return { currentStreak, accuracy, questionStatuses };
  }, [answersHistory, currentQuestion, answeredCount, totalQuestions]);

  //TODO: if questions will be more than 5 it should be change
  const getStreakClass = () => {
    if (currentStreak === 0) return 'text-secondary';
    if (currentStreak < 5) return 'text-primary';
    return 'text-accent animate-pulse';
  };

  return (
    <div className="bg-background sticky top-0 z-1 py-4">
      <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-start gap-3">
          <span className="text-muted-foreground text-sm font-medium">
            {t('runner.progress.question')} {currentQuestion} {t('runner.progress.of')} {totalQuestions}
          </span>
          <Progress value={progress} className="w-48" />
        </div>

        <div
          className={cn(
            'flex items-center justify-center gap-2',
            getStreakClass(),
            'col-span-2 row-start-1 sm:col-span-1 sm:row-start-auto'
          )}
        >
          <Flame className="h-8 w-8" strokeWidth={2.2} />
          <span className="text-3xl font-semibold tabular-nums">{currentStreak}</span>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className="text-muted-foreground text-sm font-medium">
            {t('runner.progress.accuracy')}: {accuracy}%
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const status = questionStatuses[index];
              return (
                <div
                  key={index}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    status === true && 'bg-correct-answer',
                    status === false && 'bg-wrong-answer',
                    status === 'current' && 'bg-primary',
                    status === 'pending' && 'bg-secondary'
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

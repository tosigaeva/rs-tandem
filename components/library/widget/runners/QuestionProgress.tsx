import { Flame } from 'lucide-react';

import { AnswersHistory } from '@/components/library/widget/runners/QuestionRunnerEngine';
import { Progress } from '@/components/ui';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

type QuestionProgressProperties = {
  currentQuestion: number;
  totalQuestions: number;
  answersHistory: AnswersHistory;
};

export default function QuestionProgress({
  currentQuestion,
  totalQuestions,
  answersHistory,
}: QuestionProgressProperties) {
  const { t } = useTranslation();

  const answeredCount = currentQuestion;
  const progress = (currentQuestion / totalQuestions) * 100;

  const lastAnsweredIndex = answersHistory.findLastIndex((answer) => answer !== null);
  const currentStreak =
    lastAnsweredIndex === -1
      ? 0
      : answersHistory
          .slice(0, lastAnsweredIndex + 1)
          .reduceRight((count, answer) => (answer === true ? count + 1 : 0), 0);

  const correctAnswers = answersHistory.slice(0, currentQuestion).filter((answer) => answer === true).length;
  const accuracy = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0;

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
              const status = answersHistory[index];
              return (
                <div
                  key={index}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    status === true && 'bg-correct-answer',
                    status === false && 'bg-wrong-answer',
                    status === undefined && index === currentQuestion && 'bg-primary',
                    status === undefined && index !== currentQuestion && 'bg-secondary'
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

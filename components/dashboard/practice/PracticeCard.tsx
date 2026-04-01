'use client';

import Metric from '@/components/dashboard/practice/Metric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

type PracticeCardProperties = {
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
  totalDays: number;
};

export function PracticeCard({ correctAnswers, totalAnswers, accuracy, totalDays }: PracticeCardProperties) {
  const { t } = useTranslation();
  return (
    <Card className="border-border/60 from-background via-muted/40 to-muted/20 flex h-full justify-start rounded-3xl border bg-linear-to-br py-4 shadow-sm">
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-foreground text-lg">{t('dashboard.practice.title')}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Metric label={t('dashboard.practice.correct')} value={correctAnswers} />
          <Metric label={t('dashboard.practice.accuracy')} value={`${accuracy}%`} />
          <Metric label={t('dashboard.practice.total')} value={totalAnswers} />
          <Metric label={t('dashboard.practice.days')} value={totalDays} />
        </div>
      </CardContent>
    </Card>
  );
}

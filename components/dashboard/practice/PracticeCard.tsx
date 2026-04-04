'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import Metric from '@/components/dashboard/practice/Metric';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { formatPercent } from '@/lib/format';

type PracticeCardProperties = {
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
  totalDays: number;
};

export function PracticeCard({ correctAnswers, totalAnswers, accuracy, totalDays }: PracticeCardProperties) {
  const { t } = useTranslation();
  const accuracyLabel = formatPercent(accuracy);
  return (
    <DashboardCard className="py-4">
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-foreground text-lg">{t('dashboard.practice.title')}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Metric label={t('dashboard.practice.correct')} value={correctAnswers} />
          <Metric label={t('dashboard.practice.accuracy')} value={accuracyLabel} />
          <Metric label={t('dashboard.practice.total')} value={totalAnswers} />
          <Metric label={t('dashboard.practice.days')} value={totalDays} />
        </div>
      </CardContent>
    </DashboardCard>
  );
}

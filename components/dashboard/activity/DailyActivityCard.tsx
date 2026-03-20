'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

import { DailyActivityCardProperties } from './activity.types';
import { ActivityHeatmap } from './ActivityHeatmap';
import { ActivityLegend } from './ActivityLegend';

export function DailyActivityCard({ days }: DailyActivityCardProperties) {
  const hasDays = days.length > 0;
  const { t } = useTranslation();

  return (
    <Card className="bg-card/90 w-full gap-3 rounded-3xl border-none py-4 shadow-none sm:w-fit sm:max-w-full">
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-foreground text-lg leading-tight tracking-tight">
          {t('dashboard.activity.title')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-5 pt-0 pb-4">
        <ActivityLegend />

        <section className="space-y-2">
          <ActivityHeatmap days={days} />
          {!hasDays && <p className="text-muted-foreground text-sm">{t('dashboard.activity.empty')}</p>}
        </section>
      </CardContent>
    </Card>
  );
}

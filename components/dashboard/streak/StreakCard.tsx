'use client';

import { Flame } from 'lucide-react';

import { getBestStreakKey, getStreakKey } from '@/components/dashboard/streak/streak.utilities';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { formatMessage } from '@/services/locale/format-message';

type StreakCardProperties = {
  streak: number;
  bestStreak: number;
};

export default function StreakCard({ streak, bestStreak }: StreakCardProperties) {
  const { t, languageCode } = useTranslation();

  const streakLabel = formatMessage(t(getStreakKey(streak, languageCode)), { count: streak });
  const bestLabel = formatMessage(t(getBestStreakKey(bestStreak, languageCode)), { count: bestStreak });

  return (
    <Card className="border-border/60 from-primary/50 via-primary/20 to-primary/10 flex h-full justify-center rounded-3xl border bg-gradient-to-br shadow-sm">
      <CardContent className="flex flex-col items-center gap-3 p-0">
        <Flame className="h-20 w-20 animate-pulse text-white" />
        <p className="text-xl font-semibold">{streakLabel}</p>
        {streak > 1 && <p className="text-muted-foreground text-sm">{t('dashboard.streak.keep')}</p>}
        {bestStreak > streak && <p className="text-muted-foreground text-xs">{bestLabel}</p>}
      </CardContent>
    </Card>
  );
}

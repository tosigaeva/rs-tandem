import { Flame } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type StreakCardProperties = {
  streak: number;
  bestStreak: number;
};

export default function StreakCard({ streak, bestStreak }: StreakCardProperties) {
  return (
    <Card className="border-border/60 from-primary/50 via-primary/20 to-primary/10 flex h-full justify-center rounded-3xl border bg-gradient-to-br shadow-sm">
      <CardContent className="flex flex-col items-center gap-3 p-0">
        <Flame className="h-20 w-20 animate-pulse text-white" />
        <p className="text-xl font-semibold text-white">{streak} day streak</p>
        {streak > 1 && <p className="text-sm text-white/70">Don’t break the chain</p>}
        {bestStreak > streak && (
          <p className="text-xs text-white/80">
            Personal best: <span className="font-semibold text-white">{bestStreak}</span> days
          </p>
        )}
      </CardContent>
    </Card>
  );
}

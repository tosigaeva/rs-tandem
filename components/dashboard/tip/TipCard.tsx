'use client';

import { Lightbulb } from 'lucide-react';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Tip } from '@/components/dashboard/tip/tip.types';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

type TipCardProperties = {
  tip: Tip;
};

export function TipCard({ tip }: TipCardProperties) {
  const { t } = useTranslation();
  return (
    <DashboardCard>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-muted-foreground h-5 w-5" />
          <CardTitle className="text-lg">{t(tip.title)}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="border-border/60 bg-muted/40 rounded-2xl border p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{t(tip.text)}</p>
        </div>
      </CardContent>
    </DashboardCard>
  );
}

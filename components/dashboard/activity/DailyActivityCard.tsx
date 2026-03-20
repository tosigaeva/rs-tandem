import { Card, CardContent } from '@/components/ui/card';

import { DailyActivityCardProperties } from './activity.types';
import { ActivityHeatmap } from './ActivityHeatmap';
import { ActivityLegend } from './ActivityLegend';

const messages = {
  title: 'Daily user activity',
};

export function DailyActivityCard({ days }: DailyActivityCardProperties) {
  return (
    <Card className="bg-card/90 rounded-3xl border-none shadow-none">
      <CardContent className="space-y-8 p-8">
        <ActivityLegend />

        <section className="grid items-end gap-4 md:grid-cols-[100px_minmax(0,1fr)]">
          <h2 className="text-foreground max-w-[7ch] text-xl leading-tight font-medium tracking-tight">
            {messages.title}
          </h2>
          <ActivityHeatmap days={days} />
        </section>
      </CardContent>
    </Card>
  );
}

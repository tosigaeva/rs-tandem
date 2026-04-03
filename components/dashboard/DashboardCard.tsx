import * as React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type DashboardCardProperties = React.ComponentProps<typeof Card>;

export function DashboardCard({ className, ...properties }: DashboardCardProperties) {
  return (
    <Card
      className={cn(
        'border-border/60 from-background via-muted/40 to-muted/10 h-full rounded-3xl border bg-linear-to-br shadow-sm',
        className
      )}
      {...properties}
    />
  );
}

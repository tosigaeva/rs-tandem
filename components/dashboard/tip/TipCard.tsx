import { Lightbulb } from 'lucide-react';

import { Tip } from '@/components/dashboard/tip/tip.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TipCardProperties = {
  tip: Tip;
};

export function TipCard({ tip }: TipCardProperties) {
  return (
    <Card className="border-border/60 from-background via-muted/30 to-muted/10 h-full rounded-3xl border bg-gradient-to-br shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-muted-foreground h-5 w-5" />
          <CardTitle className="text-lg">{tip.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="border-border/60 bg-muted/40 rounded-2xl border p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{tip.text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

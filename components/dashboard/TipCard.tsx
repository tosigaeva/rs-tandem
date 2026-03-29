import { Lightbulb } from 'lucide-react';

import { Tip } from '@/app/dashboard/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TipCardProperties = {
  tip: Tip;
};

export function TipCard({ tip }: TipCardProperties) {
  return (
    <Card className="bg-card/90 h-full rounded-3xl border-none shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-muted-foreground h-5 w-5" />
          <CardTitle className="text-lg">{tip.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">{tip.text}</p>
      </CardContent>
    </Card>
  );
}

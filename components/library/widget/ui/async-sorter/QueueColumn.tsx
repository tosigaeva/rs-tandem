import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type QueueType = 'callstack' | 'microtasks' | 'macrotasks';

type QueueColumnProperties = {
  id: QueueType;
  title: string;
  Icon: LucideIcon;
};

export function QueueColumn({ id, title, Icon }: QueueColumnProperties) {
  return (
    <Card className="flex-1 gap-1">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm uppercase">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-muted/50 text-muted-foreground flex min-h-[130px] flex-col items-center justify-center gap-2 rounded-md border border-dashed p-3 transition">
        <span className="text-sm">Queue empty</span>
        <span className="text-xs italic">Drop items here</span>
      </CardContent>
    </Card>
  );
}

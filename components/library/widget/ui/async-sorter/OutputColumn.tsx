import { Terminal } from 'lucide-react';

import { BlockItem } from '@/components/library/widget/ui/async-sorter/BlockItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OutputColumnProperties = {
  blocks: { id: string; code: string }[];
};

export function OutputColumn({ blocks }: OutputColumnProperties) {
  return (
    <Card className="flex-1 gap-1">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm uppercase">
          <Terminal className="h-4 w-4" />
          Output
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
        {blocks.map((block) => (
          <BlockItem key={block.id} code={block.code} />
        ))}
      </CardContent>
    </Card>
  );
}

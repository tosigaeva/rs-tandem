import { LucideIcon } from 'lucide-react';

import { BlockItem } from '@/components/library/widget/ui/async-sorter/BlockItem';
import { QueueType } from '@/components/library/widget/ui/async-sorter/DefaultComponent';
import { AsyncSorterBlock } from '@/components/library/widget/ui/async-sorter/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type QueueColumnProperties = {
  id: QueueType;
  title: string;
  Icon: LucideIcon;
  blocks: AsyncSorterBlock[];
  onDropBlock: (queue: QueueType) => void;
};

export function QueueColumn({ id, title, Icon, blocks, onDropBlock }: QueueColumnProperties) {
  return (
    <Card className="flex-1 gap-1">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm uppercase">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => onDropBlock(id)}
        className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3 text-center"
      >
        {blocks.length === 0 ? (
          <>
            <span className="text-sm">Queue empty</span>
            <span className="text-xs italic">Drop items here</span>
          </>
        ) : (
          blocks.map((b) => <BlockItem key={b.id} code={b.code} label={b.label} />)
        )}
      </CardContent>
    </Card>
  );
}

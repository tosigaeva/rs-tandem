import { Terminal } from 'lucide-react';
import { useState } from 'react';

import { BlockItem } from '@/components/library/widget/ui/async-sorter/BlockItem';
import { AsyncSorterBlock } from '@/components/library/widget/ui/async-sorter/type';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type OutputColumnProperties = {
  blocks: AsyncSorterBlock[];
  setBlocks: (blocks: AsyncSorterBlock[]) => void;
};

export function OutputColumn({ blocks, setBlocks }: OutputColumnProperties) {
  const [draggedBlock, setDraggedBlock] = useState<AsyncSorterBlock | undefined>();

  function handleDragOver(event: React.DragEvent, overBlock: AsyncSorterBlock) {
    event.preventDefault();

    if (draggedBlock === undefined || draggedBlock === overBlock) return;

    const newBlocks = [...blocks];
    const fromIndex = newBlocks.indexOf(draggedBlock);
    const toIndex = newBlocks.indexOf(overBlock);

    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);

    setBlocks(newBlocks);
  }

  return (
    <Card className="flex-1 gap-1">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm uppercase">
          <Terminal className="h-4 w-4" />
          Output
        </CardTitle>
        <CardDescription className="pt-4 pb-2">Drag logs to match the expected execution order.</CardDescription>
      </CardHeader>

      <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
        {blocks.map((block) => (
          <div
            key={block.id}
            draggable
            onDragStart={() => setDraggedBlock(block)}
            onDragOver={(event) => handleDragOver(event, block)}
          >
            <BlockItem code={block.code} label={block.label} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { CardContent } from '@/components/ui/card';

import { BlockItem } from './BlockItem';
import { AsyncSorterBlock } from './type';

type BlocksContainerProperties = {
  blocks: AsyncSorterBlock[];
  onDragStart: (b: AsyncSorterBlock) => void;
  onDrop: (index: number) => void;
  allowDrop?: boolean;
};

export function BlocksContainer({ blocks, onDragStart, onDrop, allowDrop = true }: BlocksContainerProperties) {
  return (
    <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
      {blocks.map((block, index) => (
        <div
          key={block.id}
          draggable
          onDragStart={() => onDragStart(block)}
          onDragOver={(event) => allowDrop && event.preventDefault()}
          onDrop={() => allowDrop && onDrop(index)}
        >
          <BlockItem code={block.code} label={block.label} />
        </div>
      ))}

      <div
        className="h-6"
        onDragOver={(event) => allowDrop && event.preventDefault()}
        onDrop={() => allowDrop && onDrop(blocks.length)}
      />

      {blocks.length === 0 && <div className="text-muted-foreground text-center text-sm">Drop items here</div>}
    </CardContent>
  );
}

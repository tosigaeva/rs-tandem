import { BlockItem } from '@/components/library/widget/ui/async-sorter/BlockItem';
import { AsyncSorterBlock } from '@/components/library/widget/ui/async-sorter/type';
import { CardContent } from '@/components/ui/card';

type BlocksPoolProperties = {
  blocks: AsyncSorterBlock[];
  onDragStart: (block: AsyncSorterBlock) => void;
};

export function BlocksPool({ blocks, onDragStart }: BlocksPoolProperties) {
  return (
    <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
      {blocks.map((block) => (
        <div key={block.id} draggable onDragStart={() => onDragStart(block)}>
          <BlockItem code={block.code} label={block.label} />
        </div>
      ))}
    </CardContent>
  );
}

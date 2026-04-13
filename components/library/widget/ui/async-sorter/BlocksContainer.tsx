import { useState } from 'react';

import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { BlockItem } from './BlockItem';
import { AsyncSorterBlock } from './type';

type BlocksContainerProperties = {
  blocks: AsyncSorterBlock[];
  validation?: boolean[];
  onDragStart: (block: AsyncSorterBlock) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
  allowDrop?: boolean;
  isHighlighted?: boolean;
};

export function BlocksContainer({
  blocks,
  validation,
  onDragStart,
  onDrop,
  onDragEnd,
  allowDrop = true,
  isHighlighted = false,
}: BlocksContainerProperties) {
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  return (
    <CardContent
      className={cn(
        'bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3 transition-all duration-150',
        isHighlighted && 'ring-primary/50 bg-primary/5 ring-2'
      )}
    >
      {blocks.map((block, index) => (
        <div
          key={block.id}
          draggable
          onDragStart={() => onDragStart(block)}
          onDragOver={(event) => {
            if (!allowDrop) return;
            event.preventDefault();
            setHoverIndex(index);
          }}
          onDragLeave={() => setHoverIndex(undefined)}
          onDrop={() => {
            if (!allowDrop) return;
            onDrop(index);
            setHoverIndex(undefined);
          }}
          onDragEnd={() => {
            setHoverIndex(undefined);
            onDragEnd();
          }}
        >
          {hoverIndex === index && <div className="bg-primary h-5 w-full rounded-full transition-all duration-150" />}
          <BlockItem code={block.code} label={block.label} isCorrect={validation ? validation[index] : undefined} />
        </div>
      ))}

      <div
        className="h-6"
        onDragOver={(event) => {
          if (!allowDrop) return;
          event.preventDefault();
          setHoverIndex(blocks.length);
        }}
        onDragLeave={() => setHoverIndex(undefined)}
        onDrop={() => {
          if (!allowDrop) return;
          onDrop(blocks.length);
          setHoverIndex(undefined);
        }}
      >
        {hoverIndex === blocks.length && (
          <div className="bg-primary h-5 w-full rounded-full transition-all duration-150" />
        )}
      </div>

      {blocks.length === 0 && <div className="text-muted-foreground text-center text-sm italic">Drop items here</div>}
    </CardContent>
  );
}

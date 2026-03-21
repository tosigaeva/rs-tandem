import { BlockItem } from '@/components/library/widget/ui/async-sorter/BlockItem';
import { CardContent } from '@/components/ui/card';

type BlocksPoolProperties = {
  blocks: { id: string; code: string }[];
};

export function BlocksPool({ blocks }: BlocksPoolProperties) {
  return (
    <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
      {blocks.map((block) => (
        <BlockItem key={block.id} code={block.code} />
      ))}
    </CardContent>
  );
}

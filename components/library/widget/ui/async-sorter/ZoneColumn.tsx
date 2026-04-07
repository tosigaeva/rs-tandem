import { LucideIcon } from 'lucide-react';

import { BlocksContainer } from '@/components/library/widget/ui/async-sorter/BlocksContainer';
import { AsyncSorterBlock } from '@/components/library/widget/ui/async-sorter/type';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ZoneColumnProperties = {
  title: string;
  Icon?: LucideIcon;
  description?: string;
  blocks: AsyncSorterBlock[];
  validation?: boolean[];
  onDragStart: (block: AsyncSorterBlock) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
  allowDrop?: boolean;
  isHighlighted?: boolean;
};

export default function ZoneColumn({
  title,
  Icon,
  description,
  blocks,
  validation,
  onDragStart,
  onDrop,
  onDragEnd,
  allowDrop = true,
  isHighlighted,
}: ZoneColumnProperties) {
  return (
    <Card className="flex-1 gap-1">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm uppercase">
          {Icon && <Icon className="h-4 w-4" />}
          {title}
        </CardTitle>
        {description !== undefined && description.length > 0 && (
          <CardDescription className="pt-4 pb-2">{description}</CardDescription>
        )}
      </CardHeader>
      <BlocksContainer
        blocks={blocks}
        validation={validation}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        allowDrop={allowDrop}
        isHighlighted={isHighlighted}
      />
    </Card>
  );
}

import { GripVertical } from 'lucide-react';

type BlockItemProperties = {
  code: string;
  label: string;
};

export function BlockItem({ code, label }: BlockItemProperties) {
  return (
    <div className="bg-card border-border flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition hover:shadow-md">
      <GripVertical className="h-4 w-4 opacity-50" />
      {code}
      <span className="text-muted-foreground ml-auto">{`#${label}`}</span>
    </div>
  );
}

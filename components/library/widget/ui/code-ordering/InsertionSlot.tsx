import { useDebouncedValue } from '@/hooks/use-debounced-value';

type InsertionSlotProperties = {
  index: number;
  hoverIndex: number | undefined;
  setHoverIndex: (index: number | undefined) => void;
  dragIndex: number | undefined;
  onInsert: (from: number, to: number) => void;
};

export function InsertionSlot({ index, hoverIndex, setHoverIndex, dragIndex, onInsert }: InsertionSlotProperties) {
  const debouncedHoverIndex = useDebouncedValue(hoverIndex, 50);

  return (
    <div
      className="h-6 py-1"
      onDragOver={(event) => {
        event.preventDefault();
        setHoverIndex(index);
      }}
      onDragLeave={() => setHoverIndex(undefined)}
      onDrop={() => {
        if (dragIndex === undefined) return;
        onInsert(dragIndex, index);
        setHoverIndex(undefined);
      }}
    >
      {debouncedHoverIndex === index && <div className="bg-primary h-full w-full rounded-full transition-all" />}
    </div>
  );
}

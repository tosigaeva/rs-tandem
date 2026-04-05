type InsertionSlotProperties = {
  index: number;
  hoverIndex: number | undefined;
  setHoverIndex: (index: number | undefined) => void;
  dragIndex: number | undefined;
  onInsert: (from: number, to: number) => void;
};

export function InsertionSlot({ index, hoverIndex, setHoverIndex, dragIndex, onInsert }: InsertionSlotProperties) {
  return (
    <div
      className="h-2"
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
      {hoverIndex === index && <div className="bg-primary h-0.5 w-full rounded-full transition-all" />}
    </div>
  );
}

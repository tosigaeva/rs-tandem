import { useMemo, useState } from 'react';

import BlockItem from '@/components/library/widget/ui/code-ordering/BlockItem';
import { InsertionSlot } from '@/components/library/widget/ui/code-ordering/InsertionSlot';
import { CodeOrderingPayload } from '@/components/library/widget/ui/code-ordering/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Block = {
  id: string;
  code: string;
  order: number;
};

type WidgetComponentProperties = {
  questionPayload: CodeOrderingPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const initialBlocks: Block[] = useMemo(
    () =>
      questionPayload.lines.map((line, index) => ({
        id: index.toString(),
        code: line,
        order: index,
      })),
    [questionPayload.lines]
  );

  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [dragIndex, setDragIndex] = useState<number | undefined>();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  function handleReorder(from: number, to: number) {
    if (from === to) return;

    setBlocks((previous) => {
      const copy = [...previous];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{questionPayload.description}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Расставь строки кода в правильном порядке</CardDescription>
          {blocks.map((block, index) => (
            <div key={block.id} className="mb-0.5">
              <InsertionSlot
                index={index}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                dragIndex={dragIndex}
                onInsert={handleReorder}
              />
              <div
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragEnd={() => setDragIndex(undefined)}
                className="cursor-grab active:cursor-grabbing"
              >
                <BlockItem code={block.code} order={block.order} />
              </div>
            </div>
          ))}
          <InsertionSlot
            index={blocks.length}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
            dragIndex={dragIndex}
            onInsert={handleReorder}
          />
          <PrimaryButton
            variant="secondary"
            /*onClick={isChecked ? handleNext : handleCheck}
            disabled={selected === undefined}*/
            className="mt-4 w-full py-6"
          >
            {/*{isChecked ? messages.nextQuestion : messages.checkAnswer}*/}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

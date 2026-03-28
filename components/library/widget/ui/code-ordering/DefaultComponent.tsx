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
  questionId: string;
  questionPayload: CodeOrderingPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export const messages = {
  checkAnswer: 'Check Answer',
  nextQuestion: 'Next Question',
};

function validateAnswer(questionId: string, userAnswers: number[]) {
  const answers: Record<string, number[]> = {
    'co-001': [1, 0, 2, 3, 4],
  };
  const correctOrder = answers[questionId];
  return userAnswers.map((answer, index) => answer === correctOrder[index]);
}

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
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
  const [verdict, setVerdict] = useState<boolean[] | undefined>();

  function handleReorder(from: number, to: number) {
    if (from === to) return;

    setBlocks((previous) => {
      const copy = [...previous];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  }

  const handleCheck = async () => {
    const userOrder = blocks.map((block) => block.order);

    await onCheck(userOrder.join(''));

    const result = validateAnswer(questionId, userOrder);
    setVerdict(result);
  };

  const handleNext = () => {
    setBlocks(initialBlocks);
    setVerdict(undefined);
    onNext();
  };

  const isChecked = verdict !== undefined;

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
                <BlockItem code={block.code} order={block.order} isCorrect={verdict ? verdict[index] : undefined} />
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
            onClick={isChecked ? handleNext : handleCheck}
            className="mt-4 w-full py-6"
          >
            {isChecked ? messages.nextQuestion : messages.checkAnswer}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';

import InfoBox from '@/components/InfoBox';
import BlockItem from '@/components/library/widget/ui/code-ordering/BlockItem';
import { InsertionSlot } from '@/components/library/widget/ui/code-ordering/InsertionSlot';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { CodeOrderingPayloadQuestion } from '@/types/schemas/question-payload-schema';
import { ValidationResult } from '@/types/validation';

type Block = {
  id: string;
  code: string;
  order: number;
};

type WidgetComponentProperties = {
  questionId: number;
  questionPayload: CodeOrderingPayloadQuestion;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { t, translate } = useTranslation();

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
  const [isOverArea, setIsOverArea] = useState(false);

  const [keyboardIndex, setKeyboardIndex] = useState<number>(0);
  const [keyboardDragIndex, setKeyboardDragIndex] = useState<number | undefined>();
  const [, setIsKeyboardMode] = useState(false);

  const [verdict, setVerdict] = useState<boolean[] | undefined>();

  const sectionReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionReference.current?.focus();
  }, [questionId]);

  function handleReorder(from: number, to: number) {
    if (from === to) return;

    setBlocks((previous) => {
      const copy = [...previous];
      const [moved] = copy.splice(from, 1);

      const correctedTo = from < to ? to - 1 : to;

      copy.splice(correctedTo, 0, moved);
      return copy;
    });
  }

  function handleKeyboardDnD(event: React.KeyboardEvent<HTMLDivElement>) {
    const maxIndex = keyboardDragIndex === undefined ? blocks.length - 1 : blocks.length;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setKeyboardIndex((previous) => {
        const next = Math.max(0, previous - 1);

        if (keyboardDragIndex !== undefined) {
          setHoverIndex(next);
        }

        return next;
      });
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setKeyboardIndex((previous) => {
        const next = Math.min(maxIndex, previous + 1);

        if (keyboardDragIndex !== undefined) {
          setHoverIndex(next);
        }

        return next;
      });
      return;
    }

    if (event.key === 'Escape') {
      setKeyboardDragIndex(undefined);
      setDragIndex(undefined);
      setHoverIndex(undefined);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (keyboardDragIndex === undefined && keyboardIndex < blocks.length) {
        setKeyboardDragIndex(keyboardIndex);
        setDragIndex(keyboardIndex);
        setHoverIndex(keyboardIndex);
        return;
      }

      if (keyboardDragIndex !== undefined) {
        const from = keyboardDragIndex;
        const to = keyboardIndex;

        const correctedTo = from < to ? to - 1 : to;

        handleReorder(from, to);

        setKeyboardIndex(correctedTo);
        setKeyboardDragIndex(undefined);
        setDragIndex(undefined);
        setHoverIndex(undefined);
      }
    }
  }

  const handleCheck = async () => {
    const userOrder = blocks.map((block) => block.order);

    const result = await onCheck(userOrder);
    if (result.isCorrect === undefined) return;

    setVerdict(result.details?.blankResults ?? userOrder.map(() => result.isCorrect ?? false));
  };

  const handleNext = () => {
    setVerdict(undefined);
    onNext();
  };

  const isChecked = verdict !== undefined;

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{translate(questionPayload.description)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{t('widget.codeOrdering.description')}</CardDescription>
          <div
            ref={sectionReference}
            tabIndex={0}
            onFocus={() => setIsKeyboardMode(true)}
            onBlur={() => setIsKeyboardMode(false)}
            onKeyDown={handleKeyboardDnD}
            className={`rounded-md px-2 transition-all duration-200 focus-visible:outline-0
            ${isOverArea ? 'ring-primary/40 bg-secondary/25 ring-2' : 'bg-secondary/10'}
            `}
          >
            {blocks.map((block, index) => (
              <div key={questionId + block.id}>
                <InsertionSlot
                  index={index}
                  hoverIndex={hoverIndex}
                  setHoverIndex={setHoverIndex}
                  dragIndex={dragIndex}
                  onInsert={handleReorder}
                />
                <div
                  draggable
                  onDragStart={() => {
                    setDragIndex(index);
                    setIsOverArea(true);
                  }}
                  onDragEnd={() => {
                    setDragIndex(undefined);
                    setIsOverArea(false);
                  }}
                  className={`cursor-grab active:cursor-grabbing ${keyboardIndex === index && keyboardDragIndex === undefined ? 'ring-primary rounded-md ring-1' : ''}`}
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
          </div>
          <InfoBox title={t('widget.keyboardHint.title')} description={t('widget.codeOrdering.keyboardHint')} />
          <PrimaryButton
            variant="secondary"
            onClick={isChecked ? handleNext : handleCheck}
            className="mt-4 w-full py-6"
          >
            {isChecked ? t('widget.question.next') : t('widget.question.check')}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

import { Box, Layers, Terminal, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { BlocksContainer } from '@/components/library/widget/ui/async-sorter/BlocksContainer';
import {
  AsyncSorterAnswer,
  AsyncSorterBlock,
  AsyncSorterPayload,
} from '@/components/library/widget/ui/async-sorter/type';
import ZoneColumn from '@/components/library/widget/ui/async-sorter/ZoneColumn';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ValidationResult } from '@/types/validation';

export type ZoneType = 'pool' | 'callstack' | 'microtasks' | 'macrotasks' | 'output';
export type ZonesState = Record<ZoneType, AsyncSorterBlock[]>;

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: AsyncSorterPayload;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

function canDrop(from?: ZoneType, to?: ZoneType) {
  if (!from || !to) return false;

  if (to === 'output' && from !== 'output') return false;
  if (to !== 'output' && from === 'output') return false;

  return true;
}

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const initialZones = {
    pool: questionPayload.blocks,
    callstack: [],
    microtasks: [],
    macrotasks: [],
    output: questionPayload.blocks,
  };

  const [draggedBlock, setDraggedBlock] = useState<AsyncSorterBlock | undefined>();
  const [sourceZone, setSourceZone] = useState<ZoneType | undefined>();
  const [zones, setZones] = useState<ZonesState>(initialZones);

  const [validationResult, setValidationResult] = useState<Record<keyof AsyncSorterAnswer, boolean[]> | undefined>();

  useEffect(() => {
    setZones(initialZones);
    setValidationResult(undefined);
  }, [questionId, questionPayload.blocks]);

  function handleDrop(targetZone: ZoneType, index: number) {
    if (draggedBlock === undefined || sourceZone === undefined) return;

    if (!canDrop(sourceZone, targetZone)) return;

    setZones((previous) => {
      const next = { ...previous };

      const sourceList = [...next[sourceZone]];
      const targetList = sourceZone === targetZone ? sourceList : [...next[targetZone]];

      const newSource = sourceList.filter((b) => b.id !== draggedBlock.id);
      const list = sourceZone === targetZone ? newSource : targetList;

      list.splice(index, 0, draggedBlock);

      next[sourceZone] = sourceZone === targetZone ? list : newSource;
      next[targetZone] = list;

      return next;
    });

    setDraggedBlock(undefined);
    setSourceZone(undefined);
  }

  function handleDragStart(block: AsyncSorterBlock, zone: ZoneType) {
    setDraggedBlock(block);
    setSourceZone(zone);
  }

  function handleDragEnd() {
    setDraggedBlock(undefined);
    setSourceZone(undefined);
  }

  async function handleCheckAnswer() {
    const userAnswer: AsyncSorterAnswer = {
      callStack: zones.callstack.map((b) => b.id),
      microtasks: zones.microtasks.map((b) => b.id),
      macrotasks: zones.macrotasks.map((b) => b.id),
      outputOrder: zones.output.map((b) => b.id),
    };

    const result = await onCheck(userAnswer);

    if (result.isCorrect === undefined || result.details === undefined || !('zoneResults' in result.details)) return;

    setValidationResult(result.details.zoneResults);
  }

  function handleNext() {
    setValidationResult(undefined);
    setZones(initialZones);
    onNext();
  }

  const isChecked = validationResult !== undefined;

  return (
    <section className="max-w-9xl mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 gap-1">
            <CardHeader className="px-4">
              <CardTitle>What is the order of console.log outputs?</CardTitle>
            </CardHeader>
            <CodeBlock code={questionPayload.codeSnippet} showCopyButton={false} />
            <CardDescription className="px-4 pt-4 pb-2">Drag the blocks into the correct queues.</CardDescription>
            <BlocksContainer
              blocks={zones.pool}
              onDragStart={(block) => handleDragStart(block, 'pool')}
              onDrop={(index) => handleDrop('pool', index)}
              onDragEnd={handleDragEnd}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <ZoneColumn
              title="Call Stack"
              Icon={Layers}
              blocks={zones.callstack}
              validation={validationResult?.callStack}
              onDragStart={(block) => handleDragStart(block, 'callstack')}
              onDrop={(index) => handleDrop('callstack', index)}
              onDragEnd={handleDragEnd}
              allowDrop={canDrop(sourceZone, 'callstack')}
              isHighlighted={canDrop(sourceZone, 'callstack')}
            />
            <ZoneColumn
              title="Microtasks"
              Icon={Zap}
              blocks={zones.microtasks}
              validation={validationResult?.microtasks}
              onDragStart={(block) => handleDragStart(block, 'microtasks')}
              onDrop={(index) => handleDrop('microtasks', index)}
              onDragEnd={handleDragEnd}
              allowDrop={canDrop(sourceZone, 'microtasks')}
              isHighlighted={canDrop(sourceZone, 'microtasks')}
            />
            <ZoneColumn
              title="Macrotasks"
              Icon={Box}
              blocks={zones.macrotasks}
              validation={validationResult?.macrotasks}
              onDragStart={(block) => handleDragStart(block, 'macrotasks')}
              onDrop={(index) => handleDrop('macrotasks', index)}
              onDragEnd={handleDragEnd}
              allowDrop={canDrop(sourceZone, 'macrotasks')}
              isHighlighted={canDrop(sourceZone, 'macrotasks')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <ZoneColumn
            title="Output"
            Icon={Terminal}
            description="Drag logs to match the expected execution order."
            blocks={zones.output}
            validation={validationResult?.outputOrder}
            onDragStart={(block) => handleDragStart(block, 'output')}
            onDrop={(index) => handleDrop('output', index)}
            onDragEnd={handleDragEnd}
            allowDrop={canDrop(sourceZone, 'output')}
            isHighlighted={canDrop(sourceZone, 'output')}
          />
          <PrimaryButton
            variant="secondary"
            className="w-full py-6"
            disabled={zones.pool.length > 0}
            onClick={isChecked ? handleNext : handleCheckAnswer}
          >
            {isChecked ? 'Next Question' : 'Check Answer'}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

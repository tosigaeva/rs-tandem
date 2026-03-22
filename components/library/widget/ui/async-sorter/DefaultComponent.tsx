import { Box, Layers, Zap } from 'lucide-react';
import { useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { OutputColumn } from '@/components/library/widget/ui/async-sorter/OutputColumn';
import { QueueColumn } from '@/components/library/widget/ui/async-sorter/QueueColumn';
import { AsyncSorterBlock, AsyncSorterPayload } from '@/components/library/widget/ui/async-sorter/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { BlocksPool } from './BlocksPool';

export type ZoneType = 'pool' | 'callstack' | 'microtasks' | 'macrotasks';
export type QueuesState = Record<ZoneType, AsyncSorterBlock[]>;

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: AsyncSorterPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({
  questionId: _,
  questionPayload,
  onCheck: __,
  onNext: ___,
}: WidgetComponentProperties) {
  const [draggedBlock, setDraggedBlock] = useState<AsyncSorterBlock | undefined>();
  const [sourceZone, setSourceZone] = useState<ZoneType | undefined>();

  const [outputBlocks, setOutputBlocks] = useState<AsyncSorterBlock[]>(questionPayload.blocks);
  const [zones, setZones] = useState<QueuesState>({
    pool: questionPayload.blocks,
    callstack: [],
    microtasks: [],
    macrotasks: [],
  });

  function handleDrop(targetZone: ZoneType) {
    if (draggedBlock === undefined || sourceZone === undefined) return;

    setZones((previous) => ({
      ...previous,
      [sourceZone]: previous[sourceZone].filter((b) => b.id !== draggedBlock.id),
      [targetZone]: [...previous[targetZone], draggedBlock],
    }));

    setDraggedBlock(undefined);
    setSourceZone(undefined);
  }

  return (
    <section className="max-w-9xl mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 gap-1">
            <CardHeader className="px-4">
              <CardTitle>What is the order of console.log outputs?</CardTitle>
            </CardHeader>
            <CodeBlock code={questionPayload.code} showCopyButton={false} />
            <CardDescription className="px-4 pt-4 pb-2">Drag the blocks into the correct queues.</CardDescription>
            <BlocksPool
              blocks={zones.pool}
              onDragStart={(block) => {
                setDraggedBlock(block);
                setSourceZone('pool');
              }}
              onDropBlock={() => handleDrop('pool')}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <QueueColumn
              id={'callstack'}
              title="Call Stack"
              Icon={Layers}
              blocks={zones.callstack}
              onDragStart={(block) => {
                setDraggedBlock(block);
                setSourceZone('callstack');
              }}
              onDropBlock={() => handleDrop('callstack')}
            />
            <QueueColumn
              id={'microtasks'}
              title="Microtasks"
              Icon={Zap}
              blocks={zones.microtasks}
              onDragStart={(block) => {
                setDraggedBlock(block);
                setSourceZone('microtasks');
              }}
              onDropBlock={() => handleDrop('microtasks')}
            />
            <QueueColumn
              id={'macrotasks'}
              title="Macrotasks"
              Icon={Box}
              blocks={zones.macrotasks}
              onDragStart={(block) => {
                setDraggedBlock(block);
                setSourceZone('macrotasks');
              }}
              onDropBlock={() => handleDrop('microtasks')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <OutputColumn blocks={outputBlocks} setBlocks={setOutputBlocks} />
          <PrimaryButton className="w-full py-6">Check Answer</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

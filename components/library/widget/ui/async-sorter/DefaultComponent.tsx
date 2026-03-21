import { Box, Layers, Zap } from 'lucide-react';

import CodeBlock from '@/components/CodeBlock';
import { OutputColumn } from '@/components/library/widget/ui/async-sorter/OutputColumn';
import { QueueColumn } from '@/components/library/widget/ui/async-sorter/QueueColumn';
import { AsyncSorterPayload } from '@/components/library/widget/ui/async-sorter/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { BlocksPool } from './BlocksPool';

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
            <BlocksPool blocks={questionPayload.blocks} />
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <QueueColumn id={'callstack'} title="Call Stack" Icon={Layers} />
            <QueueColumn id={'microtasks'} title="Microtasks" Icon={Zap} />
            <QueueColumn id={'macrotasks'} title="Macrotasks" Icon={Box} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <OutputColumn blocks={questionPayload.blocks} />
          <PrimaryButton className="w-full py-6">Check Answer</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

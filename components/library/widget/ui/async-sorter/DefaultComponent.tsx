import { Box, GripVertical, Layers, Terminal, Zap } from 'lucide-react';

import CodeBlock from '@/components/CodeBlock';
import { AsyncSorterPayload } from '@/components/library/widget/ui/async-sorter/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: AsyncSorterPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};
const queues = [
  { id: 'callstack', title: 'Call Stack', icon: Layers },
  { id: 'microtasks', title: 'Microtasks', icon: Zap },
  { id: 'macrotasks', title: 'Macrotasks', icon: Box },
];

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  return (
    <section className="max-w-9xl mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 gap-1">
            <CardHeader className="px-4">
              <CardTitle>What is the order of console.log outputs?</CardTitle>
            </CardHeader>
            <CodeBlock code={questionPayload.code} />
            <CardDescription className="px-4 pt-4 pb-2">Drag the blocks into the correct queues.</CardDescription>
            <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
              {questionPayload.blocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-card border-border flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition hover:shadow-md active:scale-95"
                >
                  <GripVertical className="h-4 w-4 opacity-50"></GripVertical>
                  {block.code}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {queues.map(({ id, title, icon: Icon }) => (
              <Card key={id} className="flex-1 gap-1">
                <CardHeader className="px-4">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase">
                    <Icon className="h-4 w-4" />
                    {title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="bg-muted/50 text-muted-foreground flex min-h-[130px] flex-col items-center justify-center gap-2 rounded-md border border-dashed p-3 transition">
                  <span className="text-sm">Queue empty</span>
                  <span className="text-xs italic">Drop items here</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Card className="flex-1 gap-1">
            <CardHeader className="px-4">
              <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <Terminal className="h-4 w-4" />
                Output
              </CardTitle>
              <CardDescription className="pt-4 pb-2">Drag logs to match the expected execution order.</CardDescription>
            </CardHeader>
            <CardContent className="bg-muted/50 flex min-h-[120px] flex-col gap-2 rounded-md border border-dashed p-3">
              {questionPayload.blocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-card border-border flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition hover:shadow-md active:scale-95"
                >
                  <GripVertical className="h-4 w-4 opacity-50"></GripVertical>
                  {block.code}
                </div>
              ))}
            </CardContent>
          </Card>
          <PrimaryButton className="w-full py-6">Check Answer</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

import { GripVertical } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
        order: index + 1,
      })),
    [questionPayload.lines]
  );

  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [dragIndex, setDragIndex] = useState<number | undefined>();

  function handleReorder(from: number, to: number) {
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
            <div
              key={block.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex !== undefined) handleReorder(dragIndex, index);
                setDragIndex(undefined);
              }}
              onDragEnd={() => setDragIndex(undefined)}
              className="bg-card border-border mb-2 flex cursor-grab items-center gap-2 rounded-md border px-3 py-3 text-sm shadow-sm transition hover:shadow-md"
            >
              <GripVertical className="h-4 w-4 opacity-50" />
              <SyntaxHighlighter
                language="javascript"
                style={oneLight}
                customStyle={{ padding: '0', fontSize: '14px', display: 'inline', background: 'transparent' }}
                showLineNumbers={false}
              >
                {block.code}
              </SyntaxHighlighter>

              <span className="text-muted-foreground ml-auto text-sm">{`#${block.order}`}</span>
            </div>
          ))}
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

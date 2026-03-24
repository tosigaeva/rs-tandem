import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: CodeCompletionPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export const messages = {
  checkAnswer: 'Check Answer',
  nextQuestion: 'Next Question',
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { code, blanks, hints } = questionPayload;

  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<boolean | undefined>();

  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputReference.current?.focus();
  }, [questionId]);

  const handleCheck = async () => {
    const result = await onCheck(input);
    setVerdict(result);
  };

  const handleNext = () => {
    setInput('');
    setVerdict(undefined);
    onNext();
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  const isChecked = verdict !== undefined;
  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          {hints.length > 0 && (
            <div className="text-primary text-end">
              <TooltipPrimitives.Root>
                <TooltipPrimitives.Trigger asChild>
                  <Info className="inline-flex h-5 w-5" />
                </TooltipPrimitives.Trigger>
                <TooltipPrimitives.Portal>
                  <TooltipPrimitives.Content
                    side="left"
                    className="bg-secondary text-secondary-foreground rounded-md px-3
                    py-1.5 text-xs text-balance shadow-lg"
                  >
                    {hints}
                    <TooltipPrimitives.Arrow className="fill-secondary!" />
                  </TooltipPrimitives.Content>
                </TooltipPrimitives.Portal>
              </TooltipPrimitives.Root>
            </div>
          )}
          <CodeBlock code={code} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Fill in the missing code</CardDescription>
          <Input
            ref={inputReference}
            disabled={isChecked}
            onChange={(event) => handleChange(event.target.value)}
            className="focus-visible:ring-[1px]"
          />
          <PrimaryButton
            onClick={isChecked ? handleNext : handleCheck}
            variant="secondary"
            disabled={!input}
            className="mt-4 w-full py-6"
          >
            {isChecked ? messages.nextQuestion : messages.checkAnswer}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

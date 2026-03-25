import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

  const [inputs, setInputs] = useState<string[]>(Array.from({ length: blanks.length }).fill(''));
  const [verdict, setVerdict] = useState<boolean | undefined>();

  const inputReferences = useRef<HTMLInputElement[] | null[]>([]);

  useEffect(() => {
    inputReferences.current[0]?.focus();
  }, [questionId]);

  const handleCheck = async () => {
    const result = await onCheck(inputs.join(','));
    setVerdict(result);
  };

  const handleNext = () => {
    setInputs(Array.from({ length: blanks.length }).fill(''));
    setVerdict(undefined);
    onNext();
  };

  const handleChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const isChecked = verdict !== undefined;

  const codeParts = code.split('___');

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
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Fill in the missing code</CardDescription>
          <pre className="overflow-x-auto font-mono">
            {codeParts.map((part, index) => (
              <span key={index} className="inline">
                {part}
                {index < blanks.length && (
                  <Input
                    type="text"
                    value={inputs[index]}
                    ref={(input) => {
                      inputReferences.current[index] = input;
                    }}
                    onChange={(event) => handleChange(event.target.value, index)}
                    disabled={isChecked}
                    className="bg-secondary/20 text-foreground w-[4rem] rounded-none border-0 border-b border-b-transparent focus-visible:ring-0"
                  />
                )}
              </span>
            ))}
          </pre>
          <PrimaryButton
            onClick={isChecked ? handleNext : handleCheck}
            variant="secondary"
            /*disabled={!input}*/
            className="mt-4 w-full py-6"
          >
            {isChecked ? messages.nextQuestion : messages.checkAnswer}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

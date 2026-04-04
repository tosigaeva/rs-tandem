import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/use-translation';
import { ValidationResult } from '@/types/validation';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: CodeCompletionPayload;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { t } = useTranslation();

  const { code, blanks } = questionPayload;
  const hints = questionPayload.hints ?? [];

  const [inputs, setInputs] = useState<string[]>(Array.from({ length: blanks.length }, () => ''));
  const [verdict, setVerdict] = useState<boolean[] | undefined>();
  const inputReferences = useRef<HTMLInputElement[] | null[]>([]);

  useEffect(() => {
    inputReferences.current[0]?.focus();
  }, [questionId]);

  const handleCheck = async () => {
    const result = await onCheck(inputs);
    if (result.isCorrect === undefined) return;

    setVerdict(result.details?.blankResults ?? inputs.map(() => result.isCorrect ?? false));
  };

  const handleNext = () => {
    setInputs(Array.from({ length: blanks.length }, () => ''));
    setVerdict(undefined);
    onNext();
  };

  const handleChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value.trim();
    setInputs(newInputs);
  };

  const isChecked = verdict !== undefined;

  const codeParts = code.split('___'); // TODO: how can be replace

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
                    {hints.map((hint, index) => (
                      <div key={index}>{`${index + 1} - ${hint}`}</div>
                    ))}
                    <TooltipPrimitives.Arrow className="fill-secondary!" />
                  </TooltipPrimitives.Content>
                </TooltipPrimitives.Portal>
              </TooltipPrimitives.Root>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{t('widget.codeComplition.description')}</CardDescription>
          <pre className="overflow-x-auto">
            {codeParts.map((part, index) => {
              const inputClass = isChecked
                ? verdict?.[index]
                  ? 'bg-correct-answer-muted/50'
                  : 'bg-wrong-answer-muted/25'
                : '';
              return (
                <span key={index} className="inline">
                  <SyntaxHighlighter
                    language="javascript"
                    style={oneLight}
                    customStyle={{ padding: '0', fontSize: '14px', display: 'inline', background: 'transparent' }}
                    showLineNumbers={false}
                  >
                    {part}
                  </SyntaxHighlighter>
                  {index < blanks.length && (
                    <span className="inline-flex items-center">
                      <Input
                        type="text"
                        value={inputs[index]}
                        ref={(input) => {
                          inputReferences.current[index] = input;
                        }}
                        onChange={(event) => handleChange(event.target.value, index)}
                        disabled={isChecked}
                        className={`bg-secondary/20 text-foreground w-16 rounded-none border-0 border-b border-b-transparent px-1 text-center text-sm focus-visible:ring-0 ${inputClass}`}
                      />
                      <sup className="text-secondary mb-3 ml-1 text-xs">{index + 1}</sup>
                    </span>
                  )}
                </span>
              );
            })}
          </pre>
          <PrimaryButton
            onClick={isChecked ? handleNext : handleCheck}
            variant="secondary"
            /*disabled={!input}*/
            className="mt-4 w-full py-6"
          >
            {isChecked ? t('widget.button.nextQuestion') : t('widget.button.checkAnswer')}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

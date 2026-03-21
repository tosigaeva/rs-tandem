import { CircleCheckBig, CircleX } from 'lucide-react';
import { useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type QuestionCardProperties = {
  questionId: string;
  question: string;
  options: string[];
  instruction: string;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export const messages = {
  checkAnswer: 'Check Answer',
  nextQuestion: 'Next Question',
};

export default function QuestionCard({
  questionId,
  question,
  options,
  instruction,
  onCheck,
  onNext,
}: QuestionCardProperties) {
  const [selected, setSelected] = useState<string | undefined>();
  const [verdict, setVerdict] = useState<boolean | undefined>();

  const handleCheck = async () => {
    if (selected === undefined) return;
    const result = await onCheck(selected);
    setVerdict(result);
  };

  const handleNext = () => {
    setSelected(undefined);
    setVerdict(undefined);
    onNext();
  };

  const isChecked = verdict !== undefined;
  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CodeBlock code={question} />
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription>{instruction}</CardDescription>

          <RadioGroup key={questionId} value={selected} onValueChange={setSelected} disabled={isChecked}>
            {options.map((option, index) => {
              const isSelected = option === selected;

              const borderClass =
                isChecked && isSelected ? (verdict ? 'border-correct-answer!' : 'border-wrong-answer!') : '';

              const Indicator =
                isChecked && isSelected ? (
                  verdict ? (
                    <CircleCheckBig className="text-correct-answer h-4 w-4" />
                  ) : (
                    <CircleX className="text-wrong-answer h-4 w-4" />
                  )
                ) : (
                  <RadioGroupItem value={option} />
                );

              return (
                <FieldLabel key={option} className={`cursor-pointer ${borderClass}`}>
                  <Field orientation="horizontal">
                    {Indicator}
                    <FieldTitle>{option}</FieldTitle>
                    <FieldDescription>{index + 1}</FieldDescription>
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>

          <PrimaryButton
            onClick={isChecked ? handleNext : handleCheck}
            disabled={selected === undefined}
            className="mt-4 w-full py-6"
          >
            {isChecked ? messages.nextQuestion : messages.checkAnswer}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

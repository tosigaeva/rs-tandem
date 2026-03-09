import { useState } from 'react';

import { validateQuestion } from '@/api/trainer.api';
import CodeBlock from '@/components/CodeBlock';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { hashString } from '@/lib/utils';

type QuestionCardProperties = {
  questionId: string;
  question: string;
  options: string[];
  instruction: string;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export const messages = {
  checkAnswer: 'Check Answer',
  selectAnOption: 'Select an answer',
};

export default function QuestionCard({ questionId, question, options, instruction, onCheck }: QuestionCardProperties) {
  const payloadHash = hashString(JSON.stringify(question));
  const [formId, setFormId] = useState(payloadHash);
  const [selected, setSelected] = useState<string | undefined>();

  if (formId !== payloadHash) {
    setFormId(payloadHash);
    setSelected(undefined);
  }

  const handleClick = async () => {
    if (selected !== undefined) {
      await onCheck(await validateQuestion(questionId, selected));
    }
  };

  const isSelected = selected !== undefined;
  const buttonText = isSelected ? messages.checkAnswer : messages.selectAnOption;
  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CodeBlock code={question} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{instruction}</CardDescription>
          <RadioGroup key={formId} onValueChange={(option) => setSelected(option)}>
            {options.map((option, index) => (
              <FieldLabel key={hashString(question + option)} className="cursor-pointer">
                <Field orientation="horizontal">
                  <RadioGroupItem value={option} />
                  <FieldTitle>{option}</FieldTitle>
                  <FieldDescription>{index + 1}</FieldDescription>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>

          <PrimaryButton onClick={() => handleClick()} disabled={!isSelected} className="mt-4 w-full py-6">
            {buttonText}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

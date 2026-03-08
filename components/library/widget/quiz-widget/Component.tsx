'use client';

import { useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { QuizPayload } from '@/components/library/widget/quiz-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { hashString } from '@/lib/utils';

type WidgetComponentProperties = {
  questionPayload: QuizPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  const payloadHash = hashString(JSON.stringify(questionPayload));
  const [formId, setFormId] = useState(payloadHash);
  const [selected, setSelected] = useState<string | undefined>();

  if (formId !== payloadHash) {
    setFormId(payloadHash);
    setSelected(undefined);
  }

  const isSelected = selected !== undefined;
  const buttonText = isSelected ? 'Check Answer' : 'Select an answer';
  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CodeBlock code={questionPayload.question} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Select one answer</CardDescription>
          <RadioGroup key={formId} onValueChange={(option) => setSelected(option)}>
            {questionPayload.options.map((option, index) => (
              <FieldLabel key={hashString(questionPayload.question + option)} className="cursor-pointer">
                <Field orientation="horizontal">
                  <RadioGroupItem value={option} />
                  <FieldTitle>{option}</FieldTitle>
                  <FieldDescription>{index + 1}</FieldDescription>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>

          <PrimaryButton onClick={onCheck} disabled={!isSelected} className="mt-4 w-full py-6">
            {buttonText}
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

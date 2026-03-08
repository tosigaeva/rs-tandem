'use client';

import { useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { QuizPayload } from '@/components/library/widget/quiz-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type WidgetComponentProperties = {
  questionPayload: QuizPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CodeBlock code={questionPayload.question} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Select one answer</CardDescription>
          <RadioGroup value={selected ?? undefined} onValueChange={setSelected}>
            {questionPayload.options.map((option, index) => (
              <FieldLabel key={option} className="cursor-pointer">
                <Field orientation="horizontal">
                  <RadioGroupItem value={option} />
                  <FieldTitle>{option}</FieldTitle>
                  <FieldDescription>{index + 1}</FieldDescription>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>

          <PrimaryButton onClick={onCheck} disabled={selected === undefined} className="mt-4 w-full py-6">
            Check
          </PrimaryButton>
        </CardContent>
      </Card>
    </section>
  );
}

import { useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export const messages = {
  checkAnswer: 'Check Answer',
  nextQuestion: 'Next Question',
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { code, blanks, hints } = questionPayload;

  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<boolean | undefined>();

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
          <CodeBlock code={code} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>Fill in the missing code</CardDescription>
          <Input disabled={isChecked} onChange={(event) => handleChange(event.target.value)} />
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

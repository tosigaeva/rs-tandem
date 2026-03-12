'use client';

import { useState } from 'react';

import { validateQuestion } from '@/api/trainer.api';
import { BigOCanvas } from '@/components/library/widget/ui/big-o-widget/BigOWidget';
import { BigOPayload } from '@/components/library/widget/ui/big-o-widget/type';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: BigOPayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');

  const handleSelect = (complexity: string) => {
    setSelectedComplexity(complexity);
  };

  const handleSubmit = async () => {
    const result = await validateQuestion(questionId, selectedComplexity);
    await onCheck(result);
  };

  return (
    <BigOCanvas
      question={questionPayload.question}
      codeExample={questionPayload.codeExample}
      selectedComplexity={selectedComplexity}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
    />
  );
}

'use client';

import { useState } from 'react';

import { BigOCanvas } from '@/components/library/widget/ui/big-o-widget/BigOWidget';
import { BigOPayload } from '@/components/library/widget/ui/big-o-widget/type';

type WidgetComponentProperties = {
  questionPayload: BigOPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');

  const handleSelect = (complexity: string) => {
    setSelectedComplexity(complexity);
  };

  const handleSubmit = async () => {
    await onCheck(selectedComplexity);
    onNext();
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

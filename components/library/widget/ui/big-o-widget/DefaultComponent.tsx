'use client';

import { useState } from 'react';

import { BigOCanvas } from '@/components/library/widget/ui/big-o-widget/BigOWidget';
import { BigOPayloadQuestion } from '@/types/schemas/question-payload-schema';
import { ValidationResult } from '@/types/validation';

type WidgetComponentProperties = {
  questionPayload: BigOPayloadQuestion;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelect = (complexity: string) => {
    setSelectedComplexity(complexity);
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      onNext();
    } else {
      const result = await onCheck(selectedComplexity);
      setIsCorrect(result.isCorrect);
      setIsSubmitted(true);
    }
  };

  return (
    <BigOCanvas
      question={questionPayload.question}
      codeExample={questionPayload.codeExample}
      selectedComplexity={selectedComplexity}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      isCorrect={isCorrect}
      isSubmitted={isSubmitted}
    />
  );
}

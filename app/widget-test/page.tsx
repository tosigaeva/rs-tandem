'use client';

import { useState } from 'react';

import { getMockQuestions } from '@/api/questions.mock';
import { LearningWidget } from '@/components/widgets/learning-widget/widget';

export default function Page() {
  const [questions] = useState(() => getMockQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((previous) => (previous + 1) % questions.length);
  };

  return <LearningWidget question={questions[currentIndex]} onNext={handleNext} />;
}

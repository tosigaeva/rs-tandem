'use client';

import { getMockQuestions } from '@/api/questions.mock';
import { LearningWidget } from '@/components/widgets/learning-widget/widget';

export default function Page() {
  const questions = getMockQuestions(10);

  return <LearningWidget questions={questions} />;
}

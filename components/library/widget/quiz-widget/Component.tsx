'use client';

import { QuizPayload } from '@/components/library/widget/quiz-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionPayload: QuizPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      question={questionPayload.question}
      options={questionPayload.options}
      instruction={'Select one answer'}
      onCheck={onCheck}
    />
  );
}

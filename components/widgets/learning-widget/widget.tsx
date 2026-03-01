'use client';

import { Question } from '@/types/question';

import { FlipCard } from './flip-card';

type LearningWidgetProperties = {
  question: Question;
  onNext?: () => void;
};

export function LearningWidget({ question, onNext }: LearningWidgetProperties) {
  return (
    <div className="flex min-h-full flex-col items-center gap-6">
      <FlipCard key={question.id} front={question.payload.question} back={question.payload.correctAnswer} />

      {onNext && <button onClick={onNext}>Next Question</button>}
    </div>
  );
}

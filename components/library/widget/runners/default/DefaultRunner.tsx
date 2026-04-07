'use client';

import QuestionProgress from '@/components/library/widget/runners/QuestionProgress';
import QuestionRunnerEngine from '@/components/library/widget/runners/QuestionRunnerEngine';
import QuestionWrapper from '@/components/library/widget/runners/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { QuestionInfo } from '@/types/schemas/question-schemas';

type DefaultRunnerProperties = {
  questions: QuestionInfo[];
  onComplete: () => void;
};

export default function DefaultRunner({ questions, onComplete }: DefaultRunnerProperties) {
  return (
    <QuestionRunnerEngine questions={questions} onComplete={onComplete}>
      {({ questions, currentIndex, answersHistory, nextQuestion, onCheck }) => {
        const question = questions[currentIndex];

        return (
          <div className="space-y-4">
            <QuestionProgress
              currentQuestion={currentIndex}
              totalQuestions={questions.length}
              answersHistory={answersHistory}
            />

            <QuestionWrapper
              questionId={question.id}
              questionPayload={question.payload}
              WidgetComponent={getWidgetComponent(question.type)}
              onCheck={onCheck}
              onNext={nextQuestion}
            />
          </div>
        );
      }}
    </QuestionRunnerEngine>
  );
}

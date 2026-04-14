'use client';
import { useState } from 'react';

import QuestionRunnerEngine from '@/components/library/widget/runners/QuestionRunnerEngine';
import QuestionWrapper from '@/components/library/widget/runners/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { QuestionInfo } from '@/types/schemas/question-schemas';

import QuestionProgress from '../QuestionProgress';

type QuestionsRunnerProperties = {
  questions: QuestionInfo[];
  totalLength: number;
  onComplete: () => void;
};

export function SliderRunner({ questions, totalLength, onComplete }: QuestionsRunnerProperties) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <QuestionRunnerEngine questions={questions} totalLength={totalLength} onComplete={onComplete}>
      {({ questions, currentIndex, answersHistory, nextQuestion, onCheck }) => {
        return (
          <div className="space-y-4">
            <QuestionProgress
              startingIndex={totalLength - questions.length}
              currentIndex={currentIndex}
              totalQuestions={totalLength}
              answersHistory={answersHistory}
            />

            <Carousel setApi={setApi} opts={{ watchDrag: false }} className="w-full">
              <CarouselContent>
                {questions.map((question) => (
                  <CarouselItem key={question.id}>
                    <QuestionWrapper
                      questionId={question.id}
                      questionPayload={question.payload}
                      WidgetComponent={getWidgetComponent(question.type)}
                      onCheck={onCheck}
                      onNext={() => {
                        api?.scrollNext();
                        nextQuestion();
                      }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        );
      }}
    </QuestionRunnerEngine>
  );
}

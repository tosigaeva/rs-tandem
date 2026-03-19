'use client';
import { useState } from 'react';

import QuestionRunnerEngine from '@/components/library/widget/runners/QuestionRunnerEngine';
import QuestionWrapper from '@/components/library/widget/runners/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export function SliderRunner({ questions }: QuestionsRunnerProperties) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <QuestionRunnerEngine questions={questions}>
      {({ questions, nextQuestion, onCheck }) => (
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
      )}
    </QuestionRunnerEngine>
  );
}

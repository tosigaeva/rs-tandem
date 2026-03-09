'use client';
import { useState } from 'react';

import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

const onCheck = async (p: boolean | undefined) => {
  console.log('verdict validateQuestion', p);
};

export function SliderQuestionRunner({ questions }: QuestionsRunnerProperties) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="flex min-h-full flex-col items-center gap-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          watchDrag: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {questions.map((question) => (
            <CarouselItem key={question.id} className="flex justify-center">
              <QuestionWrapper
                questionId={question.id}
                questionPayload={question.payload}
                WidgetComponent={getWidgetComponent(question.type)}
                onCheck={onCheck}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button onClick={() => api?.scrollNext()}>Next Question</Button>
    </div>
  );
}

'use client';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Question } from '@/types/question';

import { FlipCard } from './flip-card';

type LearningWidgetProperties = {
  questions: Question[];
};

export function LearningWidget({ questions }: LearningWidgetProperties) {
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
              <FlipCard front={question.payload.question} back={question.payload.correctAnswer} />
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

'use client';
import { useState } from 'react';

import { validateAnswer } from '@/api/trainer.api';
import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Question as QuestionType } from '@/types/question';

type QuestionsRunnerProperties = {
  questions: QuestionType[];
};

export function SliderQuestionRunner({ questions }: QuestionsRunnerProperties) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  if (currentQuestion === undefined) return <div>Results</div>;

  const nextQuestion = () => {
    api?.scrollNext();
    setCurrentIndex((index) => index + 1);
  };

  const onCheck = async (answer: string) => {
    return await validateAnswer(currentQuestion.id, answer);
  };

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
                onNext={nextQuestion}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

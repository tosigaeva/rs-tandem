'use client';

import { notFound } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import NotFound from '@/app/not-found';
import ConfirmStartOver from '@/components/ConfirmStartOver';
import DefaultRunner from '@/components/library/widget/runners/default/DefaultRunner';
import { SliderRunner } from '@/components/library/widget/runners/slider/SliderRunner';
import WidgetList from '@/components/WidgetList';
import { getQuestions, getTopicById } from '@/data/trainer.api';
import { useTranslation } from '@/hooks/use-translation';
import { toPositiveInteger } from '@/lib/parse-id';
import { QuestionInfo } from '@/types/schemas/question-schemas';
import { TopicOverview } from '@/types/schemas/topic-schema';
import { toWidgetFilter, WidgetType } from '@/types/widget';

import { WidgetListSkeleton } from './WidgetListSkeleton';

type TopicContentProperties = {
  topicId: string;
  widgetType: string | undefined;
};

export default function TopicContent({ topicId, widgetType }: TopicContentProperties) {
  const [topic, setTopic] = useState<TopicOverview | undefined>();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionInfo[] | undefined>();
  const [repeatCount, setRepeatCount] = useState<number>(0);
  const [startOverCheck, setStartOverCheck] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const initialWasComplete = useRef<boolean>(false);

  const { translate } = useTranslation();
  const selectedFilter = toWidgetFilter(widgetType);

  useEffect(() => {
    if (selectedFilter === undefined) {
      setStartOverCheck(false);
      initialWasComplete.current = false;
      setTopic((previous) => {
        console.log('should be re-rendering topics', previous);
        if (!previous) return previous;
        return { ...previous };
      });
    }

    setAllQuestions(undefined);
    setRepeatCount(0);
  }, [selectedFilter]);

  useEffect(() => {
    const parsedId = toPositiveInteger(topicId);

    if (parsedId === undefined) {
      notFound();
    }

    getTopicById(parsedId)
      .then((result) => {
        if (!result) setIsNotFound(true);
        setTopic(result);
      })
      .catch(() => notFound());
  }, [topicId, setTopic]);

  useEffect(() => {
    if (selectedFilter === undefined) return;

    const parsedId = toPositiveInteger(topicId);
    if (parsedId === undefined) {
      notFound();
    }

    setIsFetching(true);
    getQuestions(parsedId, selectedFilter)
      .then((data) => {
        setAllQuestions(data);
        initialWasComplete.current = !data.some((q) => q.isSuccess !== true);
      })
      .finally(() => setIsFetching(false));
  }, [topicId, selectedFilter]);

  const activeQuestions = useMemo(() => {
    const active = allQuestions?.filter((q) => q.isSuccess === null || q.isSuccess === false) ?? [];

    if (active.length === 0 && repeatCount >= 0) {
      return allQuestions ?? [];
    }

    return active;
  }, [allQuestions, repeatCount]);

  const handleFinishRound = () => {
    setRepeatCount((previous) => (previous += 1));
  };

  const showRunner = selectedFilter != undefined && allQuestions != undefined && !isFetching;

  const showConfirmStartOver = !startOverCheck && showRunner && initialWasComplete.current;

  const showSlider = selectedFilter === WidgetType.FlipCard;

  if (isNotFound) {
    return NotFound();
  }

  if (!topic || (selectedFilter !== undefined && isFetching)) {
    return WidgetListSkeleton();
  }

  return (
    <>
      <section className="space-y-2 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{translate(topic?.name)}</h1>
      </section>

      <section className="pt-10">
        {showConfirmStartOver ? (
          <ConfirmStartOver setStartOverCheck={setStartOverCheck} totalLength={allQuestions.length} />
        ) : showRunner ? (
          showSlider ? (
            <SliderRunner
              questions={activeQuestions}
              totalLength={allQuestions.length}
              onComplete={handleFinishRound}
            />
          ) : (
            <DefaultRunner
              questions={activeQuestions}
              totalLength={allQuestions.length}
              onComplete={handleFinishRound}
            />
          )
        ) : (
          <WidgetList
            widgets={topic?.widgets}
            topicId={topicId}
            totalQuestions={topic.totalQuestions}
            correctAnswers={topic.correctAnswers}
          />
        )}
      </section>
    </>
  );
}

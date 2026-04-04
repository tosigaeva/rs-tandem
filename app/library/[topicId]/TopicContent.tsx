'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotFound from '@/app/not-found';
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
  const [questions, setQuestions] = useState<QuestionInfo[] | undefined>();

  const { translate } = useTranslation();
  const selectedFilter = toWidgetFilter(widgetType);

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

    getQuestions(parsedId, selectedFilter).then((data) => setQuestions(data));
  }, [topicId, selectedFilter]);

  const showRunner = selectedFilter != undefined && questions != undefined;

  const showSlider = selectedFilter === WidgetType.FlipCard;

  if (isNotFound) {
    return NotFound();
  }

  if (!topic) {
    return WidgetListSkeleton();
  }

  return (
    <>
      <section className="space-y-2 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{translate(topic?.name)}</h1>
      </section>
      <section className="pt-10">
        {showRunner ? (
          showSlider ? (
            <SliderRunner questions={questions} />
          ) : (
            <DefaultRunner questions={questions} />
          )
        ) : (
          <WidgetList widgets={topic?.widgets} topicId={topicId} />
        )}
      </section>
    </>
  );
}

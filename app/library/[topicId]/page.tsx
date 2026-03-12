import { notFound } from 'next/navigation';

import { getQuestions, getTopic } from '@/api/trainer.api';
import { getWidgetsByTopic } from '@/api/widget.api';
import QuestionsRunner from '@/components/library/widget/runners/default/QuestionRunner';
import WidgetList from '@/components/WidgetList';
import { toWidgetType } from '@/types/widget';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const { topicId } = await params;
  const { widgetType } = await searchParams;

  const selectedWidgetType = toWidgetType(widgetType);

  const [topic, widgets, questions] = await Promise.all([
    getTopic(topicId),
    getWidgetsByTopic(topicId),
    getQuestions(topicId, selectedWidgetType),
  ]);

  if (!topic) notFound();

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topic.name}</h1>
      </section>

      {selectedWidgetType === undefined ? (
        <WidgetList widgets={widgets} topicId={topicId} />
      ) : (
        <QuestionsRunner questions={questions} />
      )}
    </main>
  );
}

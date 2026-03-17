import { notFound } from 'next/navigation';

import { getTopic } from '@/api/trainer.api';
import TopicContent from '@/app/library/[topicId]/TopicContent';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const { topicId } = await params;
  const topic = await getTopic(topicId);

  if (!topic) notFound();

  const { widgetType } = await searchParams;

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topic.name}</h1>
      </section>

      <TopicContent topicId={topicId} widgetType={widgetType} />
    </main>
  );
}

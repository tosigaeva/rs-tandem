import { notFound } from 'next/navigation';

import { getTopic } from '@/api/trainer.api';
import TopicContent from '@/app/library/[topicId]/TopicContent';
import { getServerLanguageCode } from '@/services/locale/locale.server';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

const getTopicId = (topicParameter: string): number => {
  const topicId = Number(topicParameter);

  if (Number.isNaN(topicId)) return -1;

  return topicId;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const languageCode = await getServerLanguageCode();

  const { topicId } = await params;
  const id = getTopicId(topicId);
  const topic = await getTopic(id);

  if (!topic) notFound();

  const { widgetType } = await searchParams;

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topic.name[languageCode]}</h1>
      </section>

      <TopicContent topicId={topicId} widgetType={widgetType} />
    </main>
  );
}

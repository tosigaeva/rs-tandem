import { notFound } from 'next/navigation';

import TopicContent from '@/app/library/[topicId]/TopicContent';
import { getTopic } from '@/data/trainer.api';
import { toPositiveInteger } from '@/lib/parse-id';
import { getServerLanguageCode } from '@/services/locale/locale.server';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const languageCode = await getServerLanguageCode();

  const { topicId } = await params;
  const id = toPositiveInteger(topicId);
  if (id == undefined) notFound();

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

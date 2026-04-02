import { notFound } from 'next/navigation';

import TopicContent from '@/app/library/[topicId]/TopicContent';
import { getTopicName } from '@/data/trainer.api';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { LanguageCode } from '@/services/locale/locale.service';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const languageCode = await getServerLanguageCode();

  const { topicId } = await params;
  let topicName: Record<LanguageCode, string> | undefined;
  try {
    topicName = await getTopicName(topicId);
  } catch {
    // it can be specific fallback page "Oops, something went wrong"
    notFound();
  }

  if (!topicName) notFound();

  const { widgetType } = await searchParams;

  return (
    <main className="mx-auto max-w-6xl space-y-12 divide-y px-6 py-10">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topicName[languageCode]}</h1>
      </section>

      <TopicContent topicId={topicId} widgetType={widgetType} />
    </main>
  );
}

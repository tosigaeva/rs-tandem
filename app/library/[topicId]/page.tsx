import TopicContent from '@/app/library/[topicId]/TopicContent';

type PageProperties = {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ widgetType?: string }>;
};

export default async function Page({ params, searchParams }: PageProperties) {
  const { topicId } = await params;
  const { widgetType } = await searchParams;

  console.log(topicId, widgetType);

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <TopicContent topicId={topicId} widgetType={widgetType} />
    </main>
  );
}

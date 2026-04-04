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
    <main className="mx-auto max-w-6xl space-y-12 divide-y px-6 py-10">
      <TopicContent topicId={topicId} widgetType={widgetType} />
    </main>
  );
}

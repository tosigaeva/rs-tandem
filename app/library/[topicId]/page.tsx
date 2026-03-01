import { getTopicWidgets } from '@/api/widgets.api';
import WidgetList from '@/components/library/widgets-list';

type PageProperties = {
  params: { topicId: string };
};

export default async function Page({ params }: PageProperties) {
  const { topicId } = params;
  const { topic, widgets } = await getTopicWidgets(topicId);

  const messages = {
    description: 'Choose a widget to practice.',
  };

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topic}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      <WidgetList widgets={widgets} />
    </main>
  );
}

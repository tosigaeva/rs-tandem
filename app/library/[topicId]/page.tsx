import { getTopicWidgets } from '@/api/widgets.api';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <li key={widget.id} className="overflow-visible">
            <Card className="flex flex-row items-center gap-4 px-4">
              <span className="bg-secondary h-17 w-24 rounded-xl"></span>
              <CardHeader className="w-full px-0 py-2">
                <CardTitle>{widget.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-10 text-sm">{widget.description}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}

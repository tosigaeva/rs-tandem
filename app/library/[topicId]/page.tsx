import { getQuestions } from '@/api/questions.api';
import { getTopic } from '@/api/topics.api';
import QuestionsRunner from '@/components/library/widget/questions-runner';

type PageProperties = {
  params: Promise<{ topicId: string }>;
};

export default async function Page({ params }: PageProperties) {
  const { topicId } = await params;

  const topic = await getTopic(topicId);
  const questions = await getQuestions(topicId);

  const messages = {
    description: 'Choose a widget to practice.',
  };

  if (topic === undefined) {
    return 'No topic found.';
  }

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{topic.name}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      <QuestionsRunner questions={questions}></QuestionsRunner>
    </main>
  );
}

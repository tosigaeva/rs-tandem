import { getTopicsOverview } from '@/api/topics.api';
import { TopicList } from '@/components/library/topics-list';

const messages = {
  title: 'Library',
  description: 'Track your progress and explore new topics.',
  userTopicsTitle: 'Continue Learning',
  topicsTitle: 'Explore More',
};

export default async function Page() {
  const { userTopics, topics } = await getTopicsOverview();

  return (
    <main className="mx-auto max-w-5xl space-y-12 py-10 sm:px-6">
      <section className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">{messages.title}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      <TopicList title={messages.userTopicsTitle} topics={userTopics} />
      <TopicList title={messages.topicsTitle} topics={topics} bordered />
    </main>
  );
}

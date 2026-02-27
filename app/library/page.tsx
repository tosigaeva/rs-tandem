import { getTopicsOverview } from '@/api/topics.api';
import { TopicList } from '@/components/library/topics-list';

const messages = {
  title: 'Library',
  description: 'Track your progress and explore new topics.',
  section: {
    start: 'Start Learning',
    continue: 'Continue Learning',
    explore: 'Explore More',
  },
};

export default async function Page() {
  const { userTopics, topics } = await getTopicsOverview();
  const hasUserTopics = userTopics?.length > 0;
  const topicsTitle = hasUserTopics ? messages.section.explore : messages.section.start;

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{messages.title}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      {hasUserTopics && <TopicList title={messages.section.continue} topics={userTopics} />}
      <TopicList title={topicsTitle} topics={topics} />
    </main>
  );
}

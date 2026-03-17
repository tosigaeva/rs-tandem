import { TopicList } from '@/components/library/TopicsList';
import { TopicService } from '@/services/topic.service';

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
  const { data: recentTopics } = await TopicService.loadRecentTopics();

  const skipIds = recentTopics?.map((topic) => topic.id) || [];

  const topicsTitle = skipIds.length > 0 ? messages.section.explore : messages.section.start;

  const { data: topicsPage } = await TopicService.loadTopics(skipIds);

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{messages.title}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      {recentTopics && <TopicList title={messages.section.continue} topics={recentTopics} />}
      {topicsPage && <TopicList title={topicsTitle} topics={topicsPage.items} />}
    </main>
  );
}

import { getTopicsOverview } from '@/api/trainer.api';
import { TopicList } from '@/components/library/TopicsList';
import Pagination from '@/components/Pagination';
import { Routes } from '@/lib/routes';

const messages = {
  title: 'Library',
  description: 'Track your progress and explore new topics.',
  section: {
    start: 'Start Learning',
    continue: 'Continue Learning',
    explore: 'Explore More',
  },
};

type PageProperties = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProperties) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? 1);

  const { userTopics, topics } = await getTopicsOverview(currentPage);

  const hasUserTopics = userTopics?.length > 0;
  const topicsTitle = hasUserTopics ? messages.section.explore : messages.section.start;

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{messages.title}</h1>
        <p className="text-muted-foreground">{messages.description}</p>
      </section>

      {hasUserTopics && <TopicList title={messages.section.continue} topics={userTopics} />}

      <section className="space-y-8">
        <TopicList title={topicsTitle} topics={topics.items} />
        <Pagination
          currentPage={topics.pagination.page}
          totalPages={topics.pagination.totalPages}
          basePath={Routes.Library}
        />
      </section>
    </main>
  );
}

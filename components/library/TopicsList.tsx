import Link from 'next/link';

import { Routes } from '@/lib/routes';
import { TopicOverview } from '@/types/schemas/topic-schema';

import { TopicCard } from './TopicCard';

type TopicListProperties = {
  title: string;
  topics: TopicOverview[];
  displayProgressBar?: boolean;
};

export function TopicList({ title, topics, displayProgressBar = false }: TopicListProperties) {
  return (
    <section className="space-y-6 pb-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic.id} className="h-full rounded-xl">
            <Link href={`${Routes.Library}/${topic.id}`}>
              <TopicCard topic={topic} displayProgressBar={displayProgressBar} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

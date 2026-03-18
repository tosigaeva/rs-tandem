import Link from 'next/link';

import { Routes } from '@/lib/routes';
import { Topic } from '@/types/schemas/topic-schema';

import { TopicCard } from './TopicCard';

type TopicListProperties = {
  title: string;
  topics: Topic[];
};

export function TopicList({ title, topics }: TopicListProperties) {
  return (
    <section className="space-y-6 pb-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <ul className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li key={topic.id} className="overflow-hidden rounded-xl">
            <Link href={`${Routes.Library}/${topic.id}`}>
              <TopicCard topic={topic} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

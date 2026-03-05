import Link from 'next/link';

import { Routes } from '@/lib/routes';
import { Topic, UserTopic } from '@/types/topic';

import { TopicCard } from './topic-card';

type TopicListProperties = {
  title: string;
  topics: (Topic | UserTopic)[];
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

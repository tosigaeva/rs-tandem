import { getLibraryTopics } from '@/api/topics.api';
import { TopicCard } from '@/components/topic-card';

export default async function Page() {
  const { userTopics, topics } = await getLibraryTopics();

  return (
    <main className="mx-auto max-w-5xl space-y-12 py-10 sm:px-6">
      <section className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Library</h1>
        <p className="text-muted-foreground">Track your progress and explore new topics.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Continue Learning</h2>

        <ul className="flex flex-wrap justify-start gap-2">
          {userTopics.map((topic) => (
            <TopicCard topic={topic} key={topic.id} />
          ))}
        </ul>
      </section>

      <section className="space-y-6 border-t pt-12">
        <h2 className="text-xl font-semibold">Explore More</h2>

        <ul className="flex flex-wrap justify-start gap-2">
          {topics.map((topic) => (
            <TopicCard topic={topic} key={topic.id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

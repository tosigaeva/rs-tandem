import { Skeleton } from '@/components/ui/skeleton';

const TopicListSkeleton = ({ title, items = 3 }: { title: string; items?: number }) => {
  return (
    <section className="space-y-6 pb-6">
      <h2 className="text-2xl font-semibold tracking-tight blur-sm">{title}</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: items }).map((_, index) => {
          return (
            <li key={index} className="h-full rounded-xl">
              <Skeleton className="bg-secondary h-50 w-full rounded-xl" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default function Loading() {
  return (
    <main className="text-foreground py-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight blur-md sm:text-4xl">Topics</h1>
          <p className="text-muted-foreground text-sm blur-xs sm:text-base">
            Mixed questions and steady progress, topic by topic.
          </p>
        </section>

        <Skeleton className="bg-secondary h-30 w-full rounded-xl" />

        <TopicListSkeleton title="Recently practiced" />

        <TopicListSkeleton title="Discover more" items={6} />
      </section>
    </main>
  );
}

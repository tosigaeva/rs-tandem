import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="text-foreground py-8">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6">
        <Skeleton className="bg-secondary h-40 w-full rounded-xl"></Skeleton>

        <article className="space-y-6">
          <section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-2">
              <Skeleton className="bg-secondary h-70 w-full rounded-xl" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-70 w-full rounded-xl" />
            </div>
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-3">
              <Skeleton className="bg-secondary h-70 w-full rounded-xl" />
            </div>
          </section>
          <section className="grid gap-6 md:grid-cols-2 lg:col-span-3">
            <Skeleton className="bg-secondary h-100 w-full rounded-xl" />
            <Skeleton className="bg-secondary h-100 w-full rounded-xl" />
          </section>
        </article>
      </section>
    </main>
  );
}

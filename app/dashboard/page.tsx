import Link from 'next/link';

import { getUser } from '@/api/user.api';
import { DailyActivityCard } from '@/components/dashboard/activity';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Routes } from '@/lib/routes';

const messages = {
  greeting: 'Hello',
  startPracticeButton: 'Start Practice',
};

export default async function Page() {
  const user = await getUser();

  return (
    <main className="text-foreground px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <article className="space-y-6">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {messages.greeting}, {user.name}!
          </h1>

          <PrimaryButton asChild>
            <Link href={Routes.Library}>{messages.startPracticeButton}</Link>
          </PrimaryButton>
        </article>

        <DailyActivityCard days={[]} />
      </section>
    </main>
  );
}

import Link from 'next/link';

import { getUser } from '@/api/user.api';
import { PrimaryButton } from '@/components/primary-button';
import { Routes } from '@/lib/routes';

const messages = {
  greeting: 'Hello',
  startPracticeButton: 'Start Practice',
};

export default async function Page() {
  const user = await getUser();

  return (
    <main className="text-foreground px-6">
      <section className="py-8">
        <h1 className="text-2xl font-bold sm:text-4xl">
          {messages.greeting}, {user.name}!
        </h1>
      </section>
      <PrimaryButton asChild>
        <Link href={Routes.Library}>{messages.startPracticeButton}</Link>
      </PrimaryButton>
    </main>
  );
}

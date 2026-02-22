'use client';

import { useRouter } from 'next/navigation';

import { PrimaryButton } from '@/components/primary-button';
import { Routes } from '@/lib/routes';
import { getUser } from '@/lib/user';

const messages = {
  greeting: 'Hello',
  startPracticeButton: 'Start Practice',
};

export default function Page() {
  const router = useRouter();
  const user = getUser();

  const toLibrary = () => {
    router.push(Routes.Library);
  };

  return (
    <main className="text-foreground px-6">
      <section className="py-8">
        <h1 className="text-2xl font-bold sm:text-4xl">
          {messages.greeting}, {user.name}!
        </h1>
      </section>
      <PrimaryButton onClick={toLibrary}>{messages.startPracticeButton}</PrimaryButton>
    </main>
  );
}

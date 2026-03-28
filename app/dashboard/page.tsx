import Link from 'next/link';

import { DailyActivityCard } from '@/components/dashboard/activity';
import { ProgressCard } from '@/components/dashboard/progress/ProgressCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { getDailyActivity } from '@/data/activity.api';
import { getUser } from '@/data/user.api';
import { Routes } from '@/lib/routes';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { AppMessages } from '@/services/locale/messages';

export default async function Page() {
  const [user, activity, languageCode] = await Promise.all([getUser(), getDailyActivity(), getServerLanguageCode()]);
  const days = activity.data ?? [];

  return (
    <main className="text-foreground px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <article className="space-y-6">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {AppMessages['dashboard.greeting'][languageCode]}, {user.name}!
          </h1>

          <section className="grid gap-6 lg:grid-cols-3">
            <ProgressCard todayAnswers={5} totalAnswers={10} accuracy={50} streak={3} />
          </section>

          <PrimaryButton asChild>
            <Link href={Routes.Library}>{AppMessages['dashboard.startPracticeButton'][languageCode]}</Link>
          </PrimaryButton>
        </article>

        <DailyActivityCard days={days} />
      </section>
    </main>
  );
}

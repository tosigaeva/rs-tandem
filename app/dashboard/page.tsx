import Link from 'next/link';

import { DailyActivityCard } from '@/components/dashboard/activity';
import ContinueLearningCard from '@/components/dashboard/ContunueLearningCard';
import { ProgressCard } from '@/components/dashboard/progress/ProgressCard';
import StreakCard from '@/components/dashboard/StreakCard';
import { TipCard } from '@/components/dashboard/TipCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { getDailyActivity } from '@/data/activity.api';
import { getInProgressTopics } from '@/data/dashboard.api';
import { getUser } from '@/data/user.api';
import { Routes } from '@/lib/routes';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { AppMessages } from '@/services/locale/messages';

export type Tip = {
  title: string;
  text: string;
};

const tips: Tip[] = [
  {
    title: 'JavaScript fact',
    text: '`typeof null` returns "object" — this is a historical bug in JavaScript.',
  },
  {
    title: 'JavaScript fact',
    text: '`NaN === NaN` is false. Use Number.isNaN() to check it.',
  },
  {
    title: 'JavaScript fact',
    text: '`[] + []` results in an empty string "" because of type coercion.',
  },
];

const tipOfTheDay = tips[Math.floor(Math.random() * tips.length)];

export default async function Page() {
  const [user, activity, inProgressTopicsResult, languageCode] = await Promise.all([
    getUser(),
    getDailyActivity(),
    getInProgressTopics(),
    getServerLanguageCode(),
  ]);
  const days = activity.data ?? [];
  const inProgressTopics = (inProgressTopicsResult.data ?? []).map((topic) => ({
    ...topic,
    title: topic.title[languageCode],
  }));

  return (
    <main className="text-foreground px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <article className="space-y-6">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {AppMessages['dashboard.greeting'][languageCode]}, {user.name}!
          </h1>

          <section className="grid items-stretch gap-8 lg:grid-cols-7">
            <div className="lg:col-span-2">
              <ProgressCard todayAnswers={5} totalAnswers={10} accuracy={50} streak={3} />
            </div>

            <div className="lg:col-span-2">
              <StreakCard streak={3} bestStreak={7} />
            </div>

            <div className="lg:col-span-3">
              <DailyActivityCard days={days} />
            </div>
          </section>
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <ContinueLearningCard topics={inProgressTopics} />
            <TipCard tip={tipOfTheDay} />
          </section>

          <PrimaryButton asChild>
            <Link href={Routes.Library}>{AppMessages['dashboard.startPracticeButton'][languageCode]}</Link>
          </PrimaryButton>
        </article>
      </section>
    </main>
  );
}

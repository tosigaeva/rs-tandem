'use client';

import Link from 'next/link';

import { DailyActivityCard } from '@/components/dashboard/activity';
import ContinueLearningCard from '@/components/dashboard/ContinueLearningCard';
import { ProgressCard } from '@/components/dashboard/progress/ProgressCard';
import StreakCard from '@/components/dashboard/StreakCard';
import { TipCard } from '@/components/dashboard/TipCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { DashboardStats, InProgressTopic } from '@/data/dashboard.api';
import { useTranslation } from '@/hooks/use-translation';
import { Routes } from '@/lib/routes';
import { useAuth } from '@/providers/auth-state.provider';

import { Tip } from './page';

type DashboardProperties = {
  tipOfTheDay: Tip;
  dashboardStats: DashboardStats;
  inProgressTopics: InProgressTopic[];
};

export function DashboardContent({ tipOfTheDay, dashboardStats, inProgressTopics }: DashboardProperties) {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <main className="text-foreground px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <article className="space-y-6">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {t('dashboard.greeting')}, {user?.username}!
          </h1>

          <section className="grid items-stretch gap-8 lg:grid-cols-7">
            <div className="lg:col-span-2">
              <ProgressCard
                todayAnswers={dashboardStats.todayAnswers}
                totalAnswers={dashboardStats.totalAnswers}
                accuracy={dashboardStats.accuracy}
                streak={dashboardStats.streak}
              />
            </div>

            <div className="lg:col-span-2">
              <StreakCard streak={dashboardStats.streak} bestStreak={dashboardStats.bestStreak} />
            </div>

            <div className="lg:col-span-3">
              <DailyActivityCard days={dashboardStats.days} />
            </div>
          </section>
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <ContinueLearningCard topics={inProgressTopics} />
            <TipCard tip={tipOfTheDay} />
          </section>

          <PrimaryButton asChild>
            <Link href={Routes.Library}>{t('dashboard.startPracticeButton')}</Link>
          </PrimaryButton>
        </article>
      </section>
    </main>
  );
}

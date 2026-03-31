import { DailyActivityCard } from '@/components/dashboard/activity';
import ContinueLearningCard from '@/components/dashboard/ContinueLearningCard';
import Hero from '@/components/dashboard/hero/Hero';
import { buildHeroProperties } from '@/components/dashboard/hero/hero.utilities';
import { PracticeCard } from '@/components/dashboard/practice/PracticeCard';
import StreakCard from '@/components/dashboard/StreakCard';
import { TipCard } from '@/components/dashboard/TipCard';
import { getDashboardStats, getInProgressTopics } from '@/data/dashboard.api';
import { getUser } from '@/data/user.api';
import { getServerLanguageCode } from '@/services/locale/locale.server';

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
  const [user, dashboardStatsResult, inProgressTopicsResult, languageCode] = await Promise.all([
    getUser(),
    getDashboardStats(),
    getInProgressTopics(),
    getServerLanguageCode(),
  ]);
  const dashboardStats = dashboardStatsResult.data ?? {
    days: [],
    todayAnswers: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    accuracy: 0,
    totalDays: 0,
    streak: 0,
    bestStreak: 0,
  };
  const inProgressTopics = (inProgressTopicsResult.data ?? []).map((topic) => ({
    ...topic,
    title: topic.title[languageCode],
  }));

  return (
    <main className="text-foreground px-4 py-8 sm:px-6 lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-10">
        <Hero
          {...buildHeroProperties(user.name, {
            todayAnswers: dashboardStats.todayAnswers,
            totalAnswers: dashboardStats.totalAnswers,
            streak: dashboardStats.streak,
          })}
        />

        <article className="space-y-6">
          <section className="grid items-stretch gap-6 lg:grid-cols-7">
            <div className="lg:col-span-2">
              <PracticeCard
                correctAnswers={dashboardStats.correctAnswers}
                totalAnswers={dashboardStats.totalAnswers}
                accuracy={dashboardStats.accuracy}
                totalDays={dashboardStats.totalDays}
              />
            </div>

            <div className="lg:col-span-2">
              <StreakCard streak={dashboardStats.streak} bestStreak={dashboardStats.bestStreak} />
            </div>

            <div className="lg:col-span-3">
              <DailyActivityCard days={dashboardStats.days} />
            </div>
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <ContinueLearningCard topics={inProgressTopics} />
            <TipCard tip={tipOfTheDay} />
          </section>
        </article>
      </section>
    </main>
  );
}

import { DailyActivityCard } from '@/components/dashboard/activity';
import Hero from '@/components/dashboard/hero/Hero';
import { buildHeroProperties } from '@/components/dashboard/hero/hero.utilities';
import { PracticeCard } from '@/components/dashboard/practice/PracticeCard';
import RecentTopicsCard from '@/components/dashboard/RecentTopicsCard';
import StreakCard from '@/components/dashboard/streak/StreakCard';
import { getRandomTip } from '@/components/dashboard/tip/tip.utilities';
import { TipCard } from '@/components/dashboard/tip/TipCard';
import { getDashboardStats, getInProgressTopics } from '@/data/dashboard.api';
import { getUser } from '@/data/user.api';
import { getServerLanguageCode, getServerT } from '@/services/locale/locale.server';

const randomTip = getRandomTip();

export default async function Page() {
  const [user, dashboardStatsResult, inProgressTopicsResult, languageCode, t] = await Promise.all([
    getUser(),
    getDashboardStats(),
    getInProgressTopics(),
    getServerLanguageCode(),
    getServerT(),
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
    <main className="text-foreground py-8">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6">
        <Hero
          key={languageCode}
          {...buildHeroProperties(t, languageCode, user.name, {
            todayAnswers: dashboardStats.todayAnswers,
            totalAnswers: dashboardStats.totalAnswers,
            streak: dashboardStats.streak,
          })}
        />

        <article className="space-y-6">
          <section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-7">
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
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-3">
              <DailyActivityCard days={dashboardStats.days} />
            </div>
          </section>
          <section className="grid gap-6 md:grid-cols-2 lg:col-span-3">
            <RecentTopicsCard topics={inProgressTopics} />
            <TipCard tip={randomTip} />
          </section>
        </article>
      </section>
    </main>
  );
}

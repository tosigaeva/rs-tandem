import { DashboardContent } from '@/app/dashboard/dashboard-content';
import { getRandomTip } from '@/components/dashboard/tip/tip.utilities';
import { getDashboardStats, getInProgressTopics } from '@/data/dashboard.api';
import { getServerLanguageCode } from '@/services/locale/locale.server';

const randomTip = getRandomTip();

export default async function Page() {
  const [dashboardStatsResult, inProgressTopicsResult, languageCode] = await Promise.all([
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
    <DashboardContent
      dashboardStats={dashboardStats}
      randomTip={randomTip}
      inProgressTopics={inProgressTopics}
      languageCode={languageCode}
    />
  );
}

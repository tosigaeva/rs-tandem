import { getDashboardStats, getInProgressTopics } from '@/data/dashboard.api';

import { DashboardContent } from './dashboard-content';

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
  const [dashboardStatsResult, inProgressTopicsResult] = await Promise.all([
    getDashboardStats(),
    getInProgressTopics(),
  ]);

  const dashboardStats = dashboardStatsResult.data ?? {
    days: [],
    todayAnswers: 0,
    totalAnswers: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0,
  };
  const inProgressTopics = inProgressTopicsResult.data ?? [];

  return (
    <DashboardContent dashboardStats={dashboardStats} tipOfTheDay={tipOfTheDay} inProgressTopics={inProgressTopics} />
  );
}

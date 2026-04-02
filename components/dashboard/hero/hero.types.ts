export type HeroState = 'first' | 'returning' | 'active';

export type HeroStats = {
  todayAnswers: number;
  totalAnswers: number;
  streak: number;
};

export type HeroProperties = {
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

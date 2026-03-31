import { HeroProperties, HeroState, HeroStats } from '@/components/dashboard/hero/hero.types';
import { Routes } from '@/lib/routes';

export function getHeroState(stats: HeroStats): HeroState {
  if (stats.totalAnswers === 0) return 'first';
  if (stats.streak > 0 || stats.todayAnswers > 0) return 'active';
  return 'returning';
}

export function buildHeroProperties(userName: string, stats: HeroStats): HeroProperties {
  const state = getHeroState(stats);

  switch (state) {
    case 'first': {
      return {
        label: 'Welcome',
        title: `Let’s start your learning journey, ${userName}`,
        subtitle: 'Build your first habit in just a few minutes.',
        cta: 'Start learning',
        href: Routes.Library,
      };
    }

    case 'active': {
      return {
        label: 'You’re on a roll',
        title: `Keep the streak alive, ${userName}`,
        subtitle: `You’ve answered ${stats.todayAnswers} today. Keep it going.`,
        cta: 'Resume practice',
        href: Routes.Library,
      };
    }

    case 'returning': {
      return {
        label: 'Your learning space',
        title: `Ready to continue, ${userName}?`,
        subtitle: 'Pick up where you left off or start something new.',
        cta: 'Continue practice',
        href: Routes.Library,
      };
    }
  }
}

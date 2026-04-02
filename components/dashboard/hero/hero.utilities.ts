import { HeroProperties, HeroState, HeroStats } from '@/components/dashboard/hero/hero.types';
import { Routes } from '@/lib/routes';
import { formatMessage } from '@/services/locale/format-message';
import { LanguageCode } from '@/services/locale/locale.service';
import type { MessageKey } from '@/services/locale/messages';
import { selectPluralCategory } from '@/services/locale/plural';

function getHeroState(stats: HeroStats): HeroState {
  if (stats.totalAnswers === 0) return 'first';
  if (stats.streak > 0 || stats.todayAnswers > 0) return 'active';
  return 'returning';
}

function getHeroSubtitleKey(count: number, languageCode: LanguageCode): MessageKey {
  if (count === 0) return 'dashboard.hero.active.subtitle.zero';

  const category = selectPluralCategory(count, languageCode);

  if (category === 'one') return 'dashboard.hero.active.subtitle.one';
  if (category === 'few') return 'dashboard.hero.active.subtitle.few';
  if (category === 'many') return 'dashboard.hero.active.subtitle.many';

  return 'dashboard.hero.active.subtitle.other';
}

export function buildHeroProperties(
  t: (key: MessageKey, values?: Record<string, string | number>) => string,
  languageCode: LanguageCode,
  userName: string,
  stats: HeroStats
): HeroProperties {
  const state = getHeroState(stats);

  switch (state) {
    case 'first': {
      return {
        label: t('dashboard.hero.first.label'),
        title: formatMessage(t('dashboard.hero.first.title'), { name: userName }),
        subtitle: formatMessage(t(getHeroSubtitleKey(stats.todayAnswers, languageCode)), { count: stats.todayAnswers }),
        cta: t('dashboard.hero.first.cta'),
        href: Routes.Library,
      };
    }

    case 'active': {
      return {
        label: t('dashboard.hero.active.label'),
        title: formatMessage(t('dashboard.hero.active.title'), { name: userName }),
        subtitle: formatMessage(t(getHeroSubtitleKey(stats.todayAnswers, languageCode)), { count: stats.todayAnswers }),
        cta: t('dashboard.hero.active.cta'),
        href: Routes.Library,
      };
    }

    case 'returning': {
      return {
        label: t('dashboard.hero.returning.label'),
        title: formatMessage(t('dashboard.hero.returning.title'), { name: userName }),
        subtitle: formatMessage(t('dashboard.hero.returning.subtitle'), { count: stats.todayAnswers }),
        cta: t('dashboard.hero.returning.cta'),
        href: Routes.Library,
      };
    }
  }
}

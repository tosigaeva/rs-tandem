import { LanguageCode } from '@/services/locale/locale.service';
import { MessageKey } from '@/services/locale/messages';
import { selectPluralCategory } from '@/services/locale/plural';

export function getStreakKey(count: number, languageCode: LanguageCode): MessageKey {
  const category = selectPluralCategory(count, languageCode);

  if (category === 'one') return 'dashboard.streak.title.one';
  if (category === 'few') return 'dashboard.streak.title.few';
  if (category === 'many') return 'dashboard.streak.title.many';

  return 'dashboard.streak.title.other';
}

export function getBestStreakKey(count: number, languageCode: LanguageCode): MessageKey {
  const category = selectPluralCategory(count, languageCode);

  if (category === 'one') return 'dashboard.streak.best.one';
  if (category === 'few') return 'dashboard.streak.best.few';
  if (category === 'many') return 'dashboard.streak.best.many';

  return 'dashboard.streak.best.other';
}

import { LocaleString } from '@/types/schemas/locale-schemas';

import { LanguageCode } from './locale.service';

export const AppMessages = {
  /// library
  'library.title': {
    [LanguageCode.en]: 'Library',
    [LanguageCode.ru]: 'Библиотека',
    [LanguageCode.by]: 'Бібліятэка',
  },
  'library.description': {
    [LanguageCode.en]: 'Track your progress and explore new topics.',
    [LanguageCode.ru]: 'Отслеживайте свой прогресс и изучайте новые темы.',
    [LanguageCode.by]: 'Сачыце за сваім прагрэсам і вывучайце новыя тэмы.',
  },
  'library.section.start': {
    [LanguageCode.en]: 'Start Learning',
    [LanguageCode.ru]: 'Начать обучение',
    [LanguageCode.by]: 'Пачаць навучанне',
  },
  'library.section.continue': {
    [LanguageCode.en]: 'Continue Learning',
    [LanguageCode.ru]: 'Продолжить обучение',
    [LanguageCode.by]: 'Працягнуць навучанне',
  },
  'library.section.explore': {
    [LanguageCode.en]: 'Explore More',
    [LanguageCode.ru]: 'Узнать больше',
    [LanguageCode.by]: 'Даведацца больш',
  },
} satisfies Record<string, LocaleString>;

export type MessageKey = keyof typeof AppMessages;

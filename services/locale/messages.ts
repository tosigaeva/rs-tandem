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

  /// dashboard
  'dashboard.greeting': {
    [LanguageCode.en]: 'Hello',
    [LanguageCode.ru]: 'Привет',
    [LanguageCode.by]: 'Прывітанне',
  },
  'dashboard.startPracticeButton': {
    [LanguageCode.en]: 'Start Practice',
    [LanguageCode.ru]: 'Начать практику',
    [LanguageCode.by]: 'Пачаць практыку',
  },
  'dashboard.activity.title': {
    [LanguageCode.en]: 'Daily user activity',
    [LanguageCode.ru]: 'Ежедневная активность пользователя',
    [LanguageCode.by]: 'Штодзённая актыўнасць карыстальніка',
  },
  'dashboard.activity.empty': {
    [LanguageCode.en]: 'No activity yet. Solve a few questions first.',
    [LanguageCode.ru]: 'Пока нет активности. Сначала решите несколько вопросов.',
    [LanguageCode.by]: 'Пакуль няма актыўнасці. Спачатку вырашыце некалькі пытанняў.',
  },
  /// results
  'results.perfect.title': {
    [LanguageCode.en]: 'Perfect Score!',
    [LanguageCode.ru]: 'Идеальный результат!',
    [LanguageCode.by]: 'Ідэальны вынік!',
  },
  'results.perfect.description': {
    [LanguageCode.en]: 'Outstanding work. You got everything right!',
    [LanguageCode.ru]: 'Отличная работа. Все ответы верны!',
    [LanguageCode.by]: 'Выдатная праца. Усё правільна!',
  },

  'results.great.title': {
    [LanguageCode.en]: 'Great job!',
    [LanguageCode.ru]: 'Отличная работа!',
    [LanguageCode.by]: 'Выдатна!',
  },
  'results.great.description': {
    [LanguageCode.en]: 'You did really well. Keep it up!',
    [LanguageCode.ru]: 'Вы справились очень хорошо. Продолжайте в том же духе!',
    [LanguageCode.by]: 'Вы справіліся вельмі добра. Працягвайце!',
  },

  'results.good.title': {
    [LanguageCode.en]: 'Good effort!',
    [LanguageCode.ru]: 'Хорошая попытка!',
    [LanguageCode.by]: 'Добрая спроба!',
  },
  'results.good.description': {
    [LanguageCode.en]: 'Nice progress. A bit more practice and you will master it.',
    [LanguageCode.ru]: 'Хороший прогресс. Немного практики — и вы освоите это.',
    [LanguageCode.by]: 'Добры прагрэс. Яшчэ крыху практыкі — і ўсё атрымаецца.',
  },

  'results.keepGoing.title': {
    [LanguageCode.en]: 'Keep going!',
    [LanguageCode.ru]: 'Продолжайте!',
    [LanguageCode.by]: 'Працягвайце!',
  },
  'results.keepGoing.description': {
    [LanguageCode.en]: 'Not bad. Try again and you will improve.',
    [LanguageCode.ru]: 'Неплохо. Попробуйте снова — станет лучше.',
    [LanguageCode.by]: 'Нядрэнна. Паспрабуйце яшчэ раз — будзе лепш.',
  },

  'results.retry.title': {
    [LanguageCode.en]: 'Give it another try',
    [LanguageCode.ru]: 'Попробуйте ещё раз',
    [LanguageCode.by]: 'Паспрабуйце яшчэ раз',
  },
  'results.retry.description': {
    [LanguageCode.en]: 'No correct answers yet, but that is how learning starts.',
    [LanguageCode.ru]: 'Пока нет правильных ответов, но с этого начинается обучение.',
    [LanguageCode.by]: 'Пакуль няма правільных адказаў, але так пачынаецца навучанне.',
  },
  'results.correctAnswers': {
    [LanguageCode.en]: 'Correct Answers',
    [LanguageCode.ru]: 'Правильные ответы',
    [LanguageCode.by]: 'Правільныя адказы',
  },
  'results.percentage': {
    [LanguageCode.en]: 'correct',
    [LanguageCode.ru]: 'правильно',
    [LanguageCode.by]: 'правільна',
  },
  'results.backToLibrary': {
    [LanguageCode.en]: 'Back to Library',
    [LanguageCode.ru]: 'Назад в библиотеку',
    [LanguageCode.by]: 'Назад у бібліятэку',
  },
  'results.startOver': {
    [LanguageCode.en]: 'Start Over',
    [LanguageCode.ru]: 'Начать заново',
    [LanguageCode.by]: 'Пачаць зноў',
  },

  /// Widgets
  /// FlipCard Widget
  'widget.flip-card.tooltip_hint': {
    [LanguageCode.en]:
      'Decide whether you know the answer to reveal it. You can change your resolution after card reveal.',
    [LanguageCode.ru]:
      'Решите, знаете ли вы ответ, чтобы открыть его. Вы сможете изменить решение после открытия карточки.',
    [LanguageCode.by]:
      'Вырашыце, ці ведаеце вы адказ, каб адкрыць яго. Вы зможаце змяніць рашэнне пасля адкрыцця карткі.',
  },
  'widget.flip-card.know': {
    [LanguageCode.en]: 'I know this',
    [LanguageCode.ru]: 'Я это знаю',
    [LanguageCode.by]: 'Я гэта ведаю',
  },
  'widget.flip-card.not-know': {
    [LanguageCode.en]: "I don't know this",
    [LanguageCode.ru]: 'Я этого не знаю',
    [LanguageCode.by]: 'Я гэтага не ведаю',
  },
  /// BigO Widget
  'widget.big-o.selected': {
    en: 'Selected',
    ru: 'Выбрано',
    by: 'Выбрана',
  },
  'widget.big-o.tooltip_hint': {
    en: 'Click on a curve to select complexity of the algorithm',
    ru: 'Нажмите на кривую, чтобы выбрать сложность алгоритма',
    by: 'Націсніце на крывую, каб выбраць складанасць алгарытму',
  },

  /// Buttons
  'button.hint': {
    [LanguageCode.en]: 'Hint',
    [LanguageCode.ru]: 'Подсказка',
    [LanguageCode.by]: 'Падказка',
  },
  'button.next': {
    [LanguageCode.en]: 'Next',
    [LanguageCode.ru]: 'Далее',
    [LanguageCode.by]: 'Далей',
  },
  'button.check-answer': {
    [LanguageCode.en]: 'Check Answer',
    [LanguageCode.ru]: 'Проверить ответ',
    [LanguageCode.by]: 'Праверыць адказ',
  },
} satisfies Record<string, LocaleString>;

export type MessageKey = keyof typeof AppMessages;

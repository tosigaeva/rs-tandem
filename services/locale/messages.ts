import { LocaleString } from '@/types/schemas/locale-schemas';

import { LanguageCode } from './locale.service';

export const AppMessages = {
  /// Blank
  blank: {
    [LanguageCode.en]: '',
    [LanguageCode.ru]: '',
    [LanguageCode.by]: '',
  },

  /// Authentication
  'auth.signup.title': {
    [LanguageCode.en]: 'Create new account',
    [LanguageCode.ru]: 'Создать новый аккаунт',
    [LanguageCode.by]: 'Стварыць новы рахунак',
  },
  'auth.signin.title': {
    [LanguageCode.en]: 'Sign in with existing account',
    [LanguageCode.ru]: 'Войти в существующий аккаунт',
    [LanguageCode.by]: 'Увайсці ў існуючы рахунак',
  },
  'auth.form.email': {
    [LanguageCode.en]: 'Email Address',
    [LanguageCode.ru]: 'Электронная почта',
    [LanguageCode.by]: 'Электронная пошта',
  },
  'auth.form.password': {
    [LanguageCode.en]: 'Password',
    [LanguageCode.ru]: 'Пароль',
    [LanguageCode.by]: 'Пароль',
  },
  'auth.form.confirm-password': {
    [LanguageCode.en]: 'Confirm Password',
    [LanguageCode.ru]: 'Подтвердите пароль',
    [LanguageCode.by]: 'Пацвердзіце пароль',
  },
  'auth.form.username': {
    [LanguageCode.en]: 'Username',
    [LanguageCode.ru]: 'Имя пользователя',
    [LanguageCode.by]: 'Імя карыстальніка',
  },
  'auth.signup.success': {
    [LanguageCode.en]: 'Account created successfully! Welcome.',
    [LanguageCode.ru]: 'Аккаунт успешно создан! Добро пожаловать.',
    [LanguageCode.by]: 'Рахунак паспяхова створаны! Сардэчна запрашаем.',
  },
  'auth.signin.success': {
    [LanguageCode.en]: 'Successfully signed in.',
    [LanguageCode.ru]: 'Вы успешно вошли в систему.',
    [LanguageCode.by]: 'Вы паспяхова ўвайшлі ў сістэму.',
  },

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
  'library.loadingMore': {
    [LanguageCode.en]: 'Loading more topics',
    [LanguageCode.ru]: 'Загружаем больше тем',
    [LanguageCode.by]: 'Загружаем больш тэм',
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
  'dashboard.activity.day.no': {
    [LanguageCode.en]: 'No activity on {date}',
    [LanguageCode.ru]: 'Нет активности: {date}',
    [LanguageCode.by]: 'Няма актыўнасці: {date}',
  },
  'dashboard.activity.day.answers.one': {
    [LanguageCode.en]: '{count} answer on {date}',
    [LanguageCode.ru]: '{count} ответ: {date}',
    [LanguageCode.by]: '{count} адказ: {date}',
  },
  'dashboard.activity.day.answers.few': {
    [LanguageCode.en]: '{count} answers on {date}',
    [LanguageCode.ru]: '{count} ответа: {date}',
    [LanguageCode.by]: '{count} адказы: {date}',
  },
  'dashboard.activity.day.answers.many': {
    [LanguageCode.en]: '{count} answers on {date}',
    [LanguageCode.ru]: '{count} ответов: {date}',
    [LanguageCode.by]: '{count} адказаў: {date}',
  },
  'dashboard.activity.day.answers.other': {
    [LanguageCode.en]: '{count} answers on {date}',
    [LanguageCode.ru]: '{count} ответа: {date}',
    [LanguageCode.by]: '{count} адказа: {date}',
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
  /// runner
  'runner.progress.question': {
    [LanguageCode.en]: 'Question',
    [LanguageCode.ru]: 'Вопрос',
    [LanguageCode.by]: 'Пытанне',
  },
  'runner.progress.of': {
    [LanguageCode.en]: 'of',
    [LanguageCode.ru]: 'из',
    [LanguageCode.by]: 'з',
  },
  'runner.progress.accuracy': {
    [LanguageCode.en]: 'Accuracy',
    [LanguageCode.ru]: 'Точность',
    [LanguageCode.by]: 'Дакладнасць',
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
  'button.sign-in': {
    [LanguageCode.en]: 'Sign In',
    [LanguageCode.ru]: 'Войти',
    [LanguageCode.by]: 'Увайсці',
  },
  'button.sign-up': {
    [LanguageCode.en]: 'Sign Up',
    [LanguageCode.ru]: 'Регистрация',
    [LanguageCode.by]: 'Рэгістрацыя',
  },
  'button.sign-out': {
    [LanguageCode.en]: 'Sign Out',
    [LanguageCode.ru]: 'Выйти',
    [LanguageCode.by]: 'Выйсці',
  },

  /// Authentication & Session Errors
  'error.auth.invalid': {
    [LanguageCode.en]: 'Invalid email or password.',
    [LanguageCode.ru]: 'Неверный адрес почты или пароль.',
    [LanguageCode.by]: 'Несапраўдны адрас пошты ці пароль.',
  },
  'error.auth.expired': {
    [LanguageCode.en]: 'Your session has expired. Please sign in again.',
    [LanguageCode.ru]: 'Сессия истекла. Пожалуйста, войдите снова.',
    [LanguageCode.by]: 'Сесія скончылася. Калі ласка, увайдзіце зноў.',
  },
  'error.auth.conflict': {
    [LanguageCode.en]: 'This account or username already exists.',
    [LanguageCode.ru]: 'Этот аккаунт или имя пользователя уже существует.',
    [LanguageCode.by]: 'Гэты рахунак ці імя карыстальніка ўжо існуе.',
  },
  'error.auth.rate_limit': {
    [LanguageCode.en]: 'Too many attempts. Please try again later.',
    [LanguageCode.ru]: 'Слишком много попыток. Пожалуйста, попробуйте позже.',
    [LanguageCode.by]: 'Занадта шмат спроб. Калі ласка, паспрабуйце пазней.',
  },
  'error.auth.required': {
    [LanguageCode.en]: 'Please fill in all required fields.',
    [LanguageCode.ru]: 'Пожалуйста, заполните все обязательные поля.',
    [LanguageCode.by]: 'Калі ласка, запоўніце ўсе абавязковыя палі.',
  },

  /// Server & Network Errors
  'error.server.maintenance': {
    [LanguageCode.en]: 'Server is under maintenance. Please try again shortly.',
    [LanguageCode.ru]: 'Сервер на техническом обслуживании. Попробуйте позже.',
    [LanguageCode.by]: 'Сервер на тэхнічным абслугоўванні. Паспрабуйце пазней.',
  },
  'error.server.timeout': {
    [LanguageCode.en]: 'The request timed out. Please check your connection.',
    [LanguageCode.ru]: 'Время ожидания истекло. Проверьте соединение.',
    [LanguageCode.by]: 'Час чакання скончыўся. Праверце злучэнне.',
  },

  /// Global Fallback
  'error.global.unknown': {
    [LanguageCode.en]: 'An unexpected error occurred.',
    [LanguageCode.ru]: 'Произошла непредвиденная ошибка.',
    [LanguageCode.by]: 'Адбылася неспадзяваная памылка.',
  },

  /// Zod Schema Messages
  'validation.email_invalid': {
    [LanguageCode.en]: 'Please enter a valid email address.',
    [LanguageCode.ru]: 'Введите корректный адрес почты.',
    [LanguageCode.by]: 'Увядзіце карэктны адрас пошты.',
  },
  'validation.password_too_short': {
    [LanguageCode.en]: 'Password is too short.',
    [LanguageCode.ru]: 'Пароль слишком короткий.',
    [LanguageCode.by]: 'Пароль занадта кароткі.',
  },
  'validation.username_too_short': {
    [LanguageCode.en]: 'Username must be at least 3 characters.',
    [LanguageCode.ru]: 'Имя пользователя должно быть не менее 3 символов.',
    [LanguageCode.by]: 'Імя карыстальніка павінна быць не менш за 3 сімвалы.',
  },
  'validation.username_too_long': {
    [LanguageCode.en]: 'Username must be at most 12 characters.',
    [LanguageCode.ru]: 'Имя пользователя должно быть не более 12 символов.',
    [LanguageCode.by]: 'Імя карыстальніка павінна быць не больш за 12 сімвалаў.',
  },
  'validation.username_invalid': {
    [LanguageCode.en]: 'Username contains invalid characters.',
    [LanguageCode.ru]: 'Имя пользователя содержит недопустимые символы.',
    [LanguageCode.by]: 'Імя карыстальніка ўтрымлівае недапушчальныя сімвалы.',
  },
  'validation.password_mismatch': {
    [LanguageCode.en]: 'Passwords do not match.',
    [LanguageCode.ru]: 'Пароли не совпадают.',
    [LanguageCode.by]: 'Паролі не супадаюць.',
  },
  'validation.required': {
    [LanguageCode.en]: 'This field is required.',
    [LanguageCode.ru]: 'Это поле обязательно для заполнения.',
    [LanguageCode.by]: 'Гэта поле абавязкова для запаўнення.',
  },
  'validation.selection_required': {
    [LanguageCode.en]: 'Please select an option.',
    [LanguageCode.ru]: 'Пожалуйста, выберите вариант.',
    [LanguageCode.by]: 'Калі ласка, абярыце варыянт.',
  },
  'validation.uppercase': {
    [LanguageCode.en]: 'Must contain at least one uppercase letter.',
    [LanguageCode.ru]: 'Должен содержать хотя бы одну заглавную букву.',
    [LanguageCode.by]: 'Павінен утрымліваць хаця б адну вялікую літару.',
  },
} satisfies Record<string, LocaleString>;

export type MessageKey = keyof typeof AppMessages;

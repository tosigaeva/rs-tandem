import { getTopicsOverview } from '@/api/trainer.api';
import { TopicList } from '@/components/library/TopicsList';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { LanguageCode } from '@/services/locale/locale.service';

const messages = {
  title: {
    [LanguageCode.en]: 'Library',
    [LanguageCode.ru]: 'Библиотека',
    [LanguageCode.by]: 'Бібліятэка',
  },
  description: {
    [LanguageCode.en]: 'Track your progress and explore new topics.',
    [LanguageCode.ru]: 'Отслеживайте свой прогресс и изучайте новые темы.',
    [LanguageCode.by]: 'Сачыце за сваім прагрэсам і вывучайце новыя тэмы.',
  },
  section: {
    start: {
      [LanguageCode.en]: 'Start Learning',
      [LanguageCode.ru]: 'Начать обучение',
      [LanguageCode.by]: 'Пачаць навучанне',
    },
    continue: {
      [LanguageCode.en]: 'Continue Learning',
      [LanguageCode.ru]: 'Продолжить обучение',
      [LanguageCode.by]: 'Працягнуць навучанне',
    },
    explore: {
      [LanguageCode.en]: 'Explore More',
      [LanguageCode.ru]: 'Узнать больше',
      [LanguageCode.by]: 'Даведацца больш',
    },
  },
};

export default async function Page() {
  const languageCode = await getServerLanguageCode();

  const { recentTopics, topicsPage } = await getTopicsOverview();
  const hasRecentTopics = recentTopics != undefined && recentTopics.length > 0;
  const topicsTitle = hasRecentTopics ? messages.section.explore : messages.section.start;

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{messages.title[languageCode]}</h1>
        <p className="text-muted-foreground">{messages.description[languageCode]}</p>
      </section>

      {recentTopics && <TopicList title={messages.section.continue[languageCode]} topics={recentTopics} />}
      {topicsPage && <TopicList title={topicsTitle[languageCode]} topics={topicsPage.items} displayProgress={false} />}
    </main>
  );
}

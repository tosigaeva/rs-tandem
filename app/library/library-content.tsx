'use client';

import { TopicList } from '@/components/library/TopicsList';
import { useTranslation } from '@/hooks/use-translation';
import { Topic } from '@/types/schemas/topic-schema';

type Properties = {
  recentTopics: Topic[];
  pageTopics: Topic[];
  displayProgress?: boolean;
};

export default function LibraryContent({ recentTopics, pageTopics, displayProgress }: Properties) {
  const { t } = useTranslation();

  const hasRecentTopics = recentTopics != undefined && recentTopics.length > 0;
  const topicsTitleCode = hasRecentTopics ? 'library.section.explore' : 'library.section.start';

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{t('library.title')}</h1>
        <p className="text-muted-foreground">{t('library.description')}</p>
      </section>

      {recentTopics.length > 0 && <TopicList title={t('library.section.continue')} topics={recentTopics} />}
      {pageTopics.length > 0 && (
        <TopicList title={t(topicsTitleCode)} topics={pageTopics} displayProgress={displayProgress} />
      )}
    </main>
  );
}

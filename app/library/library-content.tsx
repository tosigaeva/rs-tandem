'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { TopicList } from '@/components/library/TopicsList';
import { getTopicsOverview } from '@/data/trainer.api';
import { useTranslation } from '@/hooks/use-translation';
import { usePageState } from '@/store/page-state';
import { LibraryTopicsResponse } from '@/types/topic';

export default function LibraryContent() {
  const { setPageLoading } = usePageState();
  const { t } = useTranslation();

  const [data, setData] = useState<LibraryTopicsResponse>({ recentTopics: undefined, topicsPage: undefined });

  useEffect(() => {
    async function loadData() {
      setPageLoading(true);

      try {
        const result = await getTopicsOverview();

        const { recentTopicsError, topicsPageError } = result;

        if (recentTopicsError != undefined) {
          toast.error(recentTopicsError);
        }

        if (topicsPageError != undefined) {
          toast.error(topicsPageError);
        }

        setData(result);
      } finally {
        setPageLoading(false);
      }
    }

    loadData();
  }, [setData, setPageLoading]);

  const { recentTopics, topicsPage } = data;
  const hasRecentTopics = recentTopics != undefined && recentTopics.length > 0;
  const topicsTitleCode = hasRecentTopics ? 'library.section.explore' : 'library.section.start';

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{t('library.title')}</h1>
        <p className="text-muted-foreground">{t('library.description')}</p>
      </section>

      {hasRecentTopics && <TopicList title={t('library.section.continue')} topics={recentTopics} />}
      {topicsPage && <TopicList title={t(topicsTitleCode)} topics={topicsPage.items} displayProgress={false} />}
    </main>
  );
}

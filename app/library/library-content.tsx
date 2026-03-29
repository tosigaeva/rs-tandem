'use client';

import { useState, useTransition } from 'react';

import { TopicList } from '@/components/library/TopicsList';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/use-translation';
import { PaginatedResult } from '@/types/pagination';
import { TopicOverview } from '@/types/schemas/topic-schema';

type Properties = {
  recentTopics: TopicOverview[];
  topicsPage: PaginatedResult<TopicOverview, 'Topic'>;
};

type TopicsPageResponse = {
  items: TopicOverview[];
  page: number;
  totalPages: number;
};

export default function LibraryContent({ recentTopics, topicsPage }: Properties) {
  const { t } = useTranslation();
  const [pageTopics, setPageTopics] = useState(topicsPage.items);
  const [currentPage, setCurrentPage] = useState(topicsPage.page);
  const [totalPages, setTotalPages] = useState(topicsPage.totalPages);
  const [isPending, startTransition] = useTransition();

  const hasRecentTopics = recentTopics != undefined && recentTopics.length > 0;
  const topicsTitleCode = hasRecentTopics ? 'library.section.explore' : 'library.section.start';
  const recentTopicIds = recentTopics.map((topic) => topic.id).join(',');

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    startTransition(async () => {
      const searchParameters = new URLSearchParams({
        page: String(page),
      });

      if (recentTopicIds.length > 0) {
        searchParameters.set('skipIds', recentTopicIds);
      }

      const response = await fetch(`/api/library/topics?${searchParameters.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        return;
      }

      const data: TopicsPageResponse = await response.json();

      setPageTopics(data.items);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    });
  };

  return (
    <main className="mx-auto max-w-5xl space-y-12 divide-y py-10 sm:px-6">
      <section className="space-y-2 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{t('library.title')}</h1>
        <p className="text-muted-foreground">{t('library.description')}</p>
      </section>

      {recentTopics.length > 0 && (
        <TopicList title={t('library.section.continue')} topics={recentTopics} displayProgress={true} />
      )}
      {pageTopics.length > 0 && <TopicList title={t(topicsTitleCode)} topics={pageTopics} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isPending}
      />
    </main>
  );
}

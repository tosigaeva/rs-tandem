'use client';

import { LoaderIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';

import { getLibraryTopicsPageAction } from '@/app/library/actions';
import { TopicList } from '@/components/library/TopicsList';
import Pagination, { type PaginationMode } from '@/components/Pagination';
import { useTranslation } from '@/hooks/use-translation';
import { PaginatedResult } from '@/types/pagination';
import { TopicOverview } from '@/types/schemas/topic-schema';

type Properties = {
  recentTopics: TopicOverview[];
  topicsPage: PaginatedResult<TopicOverview, 'Topic'>;
  paginationMode?: PaginationMode;
};

export default function LibraryContent({ recentTopics, topicsPage, paginationMode = 'buttons' }: Properties) {
  const { t } = useTranslation();
  const [pageTopics, setPageTopics] = useState(topicsPage.items);
  const [currentPage, setCurrentPage] = useState(topicsPage.page);
  const [totalPages, setTotalPages] = useState(topicsPage.totalPages);
  const [isPending, startTransition] = useTransition();
  const requestedPageReference = useRef<number | undefined>(undefined);
  const isScrollMode = paginationMode === 'scroll';

  const hasRecentTopics = recentTopics != undefined && recentTopics.length > 0;
  const topicsTitleCode = hasRecentTopics ? 'library.section.explore' : 'library.section.start';
  const recentTopicIds = recentTopics.map((topic) => topic.id);

  const requestPage = (page: number, mode: PaginationMode) => {
    if (page === currentPage || page < 1 || page >= totalPages) return;
    if (requestedPageReference.current === page) return;

    requestedPageReference.current = page;

    startTransition(async () => {
      try {
        const data = await getLibraryTopicsPageAction(page, recentTopicIds);

        if ('error' in data) {
          return;
        }

        setPageTopics((previousTopics) => {
          if (mode === 'scroll') {
            return [...previousTopics, ...data.items];
          }

          return data.items;
        });
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      } finally {
        requestedPageReference.current = undefined;
      }
    });
  };

  return (
    <main className="text-foreground py-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">{t('library.title')}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t('library.description')}</p>
        </section>

        {recentTopics.length > 0 && (
          <TopicList title={t('library.section.continue')} topics={recentTopics} displayProgressBar={true} />
        )}
        <section className="relative">
          {pageTopics.length > 0 && <TopicList title={t(topicsTitleCode)} topics={pageTopics} />}
          {!isScrollMode && isPending && (
            <div className="bg-background/70 absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
              <LoaderIcon className="text-muted-foreground size-6 animate-spin" aria-label="Loading topics" />
            </div>
          )}
        </section>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={requestPage}
          isLoading={isPending}
          mode={paginationMode}
          loadingLabel={t('library.loadingMore')}
        />
      </section>
    </main>
  );
}

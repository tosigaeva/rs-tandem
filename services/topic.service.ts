import { getRecentTopics, getTopicsPage } from '@/data/topic.api';
import { getAllTopics } from '@/data/topic.client';
import { QueryStorage } from '@/lib/query-storage';
import { PageInfo, PaginatedResult } from '@/types/pagination';
import { TopicAdminListItem, TopicOverview } from '@/types/schemas/topic-schema';

const RECENT_TOPICS = 'recent_topics';
const TOPIC_PAGES = 'topic_pages';

export const TopicService = {
  loadRecentTopics: (): Promise<{ data: TopicOverview[] | undefined; error?: string }> => {
    return QueryStorage.fetchQuery({
      queryKey: [RECENT_TOPICS],
      queryFn: () => getRecentTopics(),
    });
  },

  loadTopicsPage: (
    skipIds: number[] = [],
    pageInfo?: PageInfo<'Topic'>
  ): Promise<{ data: PaginatedResult<TopicOverview, 'Topic'> | undefined; error?: string }> => {
    const queryParameters = pageInfo ?? { page: 1, size: 9, orderBy: 'created_at', ascending: true };

    return QueryStorage.fetchQuery({
      queryKey: [TOPIC_PAGES, queryParameters, skipIds],
      queryFn: () => getTopicsPage(queryParameters, skipIds),
    });
  },

  loadTopicsAdminList: (): Promise<{ data: TopicAdminListItem[] | undefined; error?: string }> => {
    return getAllTopics();
  },
};

export const getQueryParameters = (pageInfo: PageInfo<'Topic'>) => {
  return Object.entries(pageInfo)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

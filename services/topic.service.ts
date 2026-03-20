import { QueryStorage } from '@/lib/query-storage';
import { PageInfo, PaginatedResult } from '@/types/pagination';
import { Topic } from '@/types/schemas/topic-schema';

import { getRecentTopics, getTopics } from '../api/topic.api';

const RECENT_TOPICS = 'recent_topics';
const TOPIC_PAGES = 'topic_pages';

export const TopicService = {
  loadRecentTopics: (): Promise<{ data: Topic[] | undefined; error?: string }> => {
    return QueryStorage.fetchQuery({
      queryKey: [RECENT_TOPICS],
      queryFn: () => getRecentTopics(),
    });
  },

  loadTopicsPage: (
    skipIds: number[] = [],
    pageInfo?: PageInfo<'Topic'>
  ): Promise<{ data: PaginatedResult<Topic, 'Topic'> | undefined; error?: string }> => {
    const queryParameters = pageInfo ?? { page: 1, size: 9, orderBy: 'created_at', ascending: true };

    return QueryStorage.fetchQuery({
      queryKey: [TOPIC_PAGES, queryParameters, skipIds],
      queryFn: () => getTopics(queryParameters, skipIds),
    });
  },
};

export const getQueryParameters = (pageInfo: PageInfo<'Topic'>) => {
  return Object.entries(pageInfo)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

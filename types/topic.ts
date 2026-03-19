import { PaginatedResult } from './pagination';
import { Topic } from './schemas/topic-schema';

export type LibraryTopicsResponse = {
  recentTopics: Topic[] | undefined;
  recentTopicsError?: string;
  topicsPage: PaginatedResult<Topic, 'Topic'> | undefined;
  topicsPageError?: string;
};
export type TopicsResponse = Topic[];

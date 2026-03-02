import { mockLibraryTopics } from '@/api/topics.mock';
import { TopicsResponse } from '@/types/topic';

export async function getTopicsOverview(): Promise<TopicsResponse> {
  return mockLibraryTopics;
}

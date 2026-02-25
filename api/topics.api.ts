import { mockLibraryTopics } from '@/api/topics.mock';
import { TopicsResponse } from '@/types/topic';

export async function getLibraryTopics(): Promise<TopicsResponse> {
  return mockLibraryTopics;
}

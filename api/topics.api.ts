import { mockLibraryTopics, mockTopics } from '@/api/topics.mock';
import { LibraryTopicsResponse, Topic } from '@/types/topic';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  return mockLibraryTopics;
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  return mockTopics.find((topic) => topic.id === topicId);
}

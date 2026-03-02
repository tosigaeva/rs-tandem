import { mockLibraryTopics } from '@/api/topics.mock';
import { TopicsResponse } from '@/types/topic';

export async function getTopicsOverview(): Promise<TopicsResponse> {
  return mockLibraryTopics;
}

export async function getTopic(topicId: string) {
  console.log(topicId)
  return (await getTopicsOverview()).topics.filter(
    (topic) => topic.id === topicId
  )[0]
}

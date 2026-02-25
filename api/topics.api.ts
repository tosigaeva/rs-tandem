import { mockTopics } from '@/api/topics.mock';
import { Topic } from '@/types/topic';

export async function getTopics(): Promise<Topic[]> {
  return mockTopics;
}

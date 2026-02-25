import { mockUserTopics } from '@/api/user-topics.mock';
import { UserTopic } from '@/types/topic';

export async function getUserTopics(): Promise<UserTopic[]> {
  return mockUserTopics;
}

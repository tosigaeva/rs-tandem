import { mockTopicWidgets } from '@/api/widgets.mock';
import { TopicWidgetsResponse } from '@/types/widget';

export async function getTopicWidgets(topicId: string): Promise<TopicWidgetsResponse> {
  console.log(topicId);
  return mockTopicWidgets;
}

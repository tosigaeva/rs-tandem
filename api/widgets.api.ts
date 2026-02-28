import { mockTopicWidgets } from '@/api/widgets.mock';
import { TopicWidgetsResponse } from '@/types/widget';

export async function getTopicWidgets(topicId: string): Promise<TopicWidgetsResponse> {
  return mockTopicWidgets;
}

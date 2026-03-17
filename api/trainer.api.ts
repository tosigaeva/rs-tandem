import { mockQuestions } from '@/api/mocks/questions.mock';
import { mockLibraryTopics, mockTopics } from '@/api/mocks/topics.mock';
import { TopicService } from '@/services/topic.service';
import { Question } from '@/types/question';
import { LibraryTopicsResponse, Topic } from '@/types/topic';
import { WidgetFilter, WidgetType } from '@/types/widget';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  if (process.env.MOCK_MODE === 'true') {
    return mockLibraryTopics;
  }

  const { data: recentTopics } = await TopicService.loadRecentTopics();
  const skipIds = recentTopics?.map((topic) => topic.id) || [];
  const { data: topicsPage } = await TopicService.loadTopics(skipIds);

  return {
    userTopics:
      recentTopics === undefined
        ? []
        : recentTopics.map((topic) => ({
            id: String(topic.id),
            name: topic.name,
            level: topic.level,
            description: topic.description,
            subject: topic.subject,
            progress: 100,
            lastTrainedAt: String(topic.lastAccessedAt),
          })),
    topics:
      topicsPage === undefined
        ? []
        : topicsPage.items.map((topic) => ({
            id: String(topic.id),
            name: topic.name,
            level: topic.level,
            description: topic.description,
            subject: topic.subject,
          })),
  };
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  return mockTopics.find((topic) => topic.id === topicId);
}

export async function getQuestions(topicId: string, filter?: WidgetFilter): Promise<Question[]> {
  let questions = mockQuestions;

  questions = questions.filter((q) => q.topicId === topicId);

  if (filter !== undefined) {
    questions = questions.filter((q) => (filter === 'all' ? q.type !== WidgetType.FlipCard : q.type === filter));
  }

  return questions;
}

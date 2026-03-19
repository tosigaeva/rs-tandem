import { mockQuestions } from '@/api/mocks/questions.mock';
import { mockLibraryTopics, mockTopics } from '@/api/mocks/topics.mock';
import { TopicService } from '@/services/topic.service';
import { Question } from '@/types/question';
import { Topic } from '@/types/schemas/topic-schema';
import { LibraryTopicsResponse } from '@/types/topic';
import { WidgetFilter, WidgetType } from '@/types/widget';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  if (process.env.MOCK_MODE === 'true') {
    return mockLibraryTopics;
  }

  const { data: recentTopics, error: recentTopicsError } = await TopicService.loadRecentTopics();
  const skipIds = recentTopics?.map((topic) => topic.id) || [];
  const { data: topicsPage, error: topicsPageError } = await TopicService.loadTopicsPage(skipIds);

  return {
    recentTopics,
    recentTopicsError,
    topicsPage,
    topicsPageError,
  };
}

export async function getTopic(topicId: number): Promise<Topic | undefined> {
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

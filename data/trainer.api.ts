import { getLibraryTopicsPage } from '@/app/library/library-topics';
import { mockQuestions } from '@/data/mocks/questions.mock';
import { mockLibraryTopics, mockTopics } from '@/data/mocks/topics.mock';
import { getQuestions as supaGetQuestions } from '@/data/supabase/questions.supabase';
import { getTopicName as supaGetTopicName } from '@/data/supabase/topics.supabase';
import { toPositiveInteger } from '@/lib/parse-id';
import { LanguageCode } from '@/services/locale/locale.service';
import { TopicService } from '@/services/topic.service';
import { Question } from '@/types/question';
import { LibraryTopicsResponse } from '@/types/topic';
import { WidgetFilter, WidgetType } from '@/types/widget';

export async function getTopicsOverview(page = 1): Promise<LibraryTopicsResponse> {
  if (process.env.MOCK_MODE === 'true') {
    return mockLibraryTopics;
  }

  try {
    const { data: recentTopics, error: recentTopicsError } = await TopicService.loadRecentTopics();

    const skipIds = recentTopics?.map((topic) => topic.id) || [];
    const { data: topicsPage, error: topicsPageError } = await getLibraryTopicsPage(page, skipIds);

    return {
      recentTopics,
      recentTopicsError,
      topicsPage,
      topicsPageError,
    };
  } catch (error) {
    console.log(error);
    return { recentTopics: undefined, topicsPage: undefined, recentTopicsError: 'something went wrong' };
  }
}

export async function getTopicName(topicId: string): Promise<Record<LanguageCode, string> | undefined> {
  const id = toPositiveInteger(topicId);
  if (id == undefined) throw new Error('Topic id is undefined');

  if (process.env.MOCK_MODE === 'true') {
    return mockTopics.find((topic) => topic.id === id)?.name;
  }

  return supaGetTopicName(topicId);
}

export async function getQuestions(topicId: string, filter: WidgetFilter): Promise<Question[]> {
  if (process.env.MOCK_MODE === 'true') {
    let questions = mockQuestions;

    questions = questions.filter((q) => q.topicId === topicId);

    if (filter !== undefined) {
      questions = questions.filter((q) => (filter === 'all' ? q.type !== WidgetType.FlipCard : q.type === filter));
    }

    return questions;
  }

  return supaGetQuestions(topicId, filter);
}

import { mockLibraryTopics, mockTopics } from '@/api/topics.mock';
import { supabaseServer } from '@/lib/supabase/server';
import { LibraryTopicsResponse, Topic } from '@/types/topic';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  if (process.env.MOCK_MODE === 'production') {
    const supabase = await supabaseServer();
    const query = supabase.from('topics').select('id, title');

    const { data, error } = await query;
    console.log(error);

    if (data === null) {
      return {
        userTopics: mockLibraryTopics.userTopics,
        topics: [],
      };
    }

    return {
      userTopics: mockLibraryTopics.userTopics,
      topics: data.map((topic) => ({
        id: topic.id,
        name: topic.title,
        level: 'Super',
        description: 'Mock',
        subject: 'mock topic',
      })),
    };
  }

  return mockLibraryTopics;
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  if (process.env.MOCK_MODE === 'production') {
    const supabase = await supabaseServer();
    const query = supabase.from('topics').select('id, title').eq('id', topicId).single();

    const { data, error } = await query;
    console.log(error);

    if (data === null) {
      return undefined;
    }

    return {
      id: topicId,
      name: data.title,
      level: '1',
      description: 'Mock',
      subject: 'mock topic',
    };
  }

  return mockTopics.find((topic) => topic.id === topicId);
}

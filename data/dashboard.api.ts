'use server';

import { z } from 'zod';

import { Routes } from '@/lib/routes';
import { supabaseServer } from '@/lib/supabase/server';
import { LocaleString } from '@/types/schemas/locale-schemas';
import { TopicOverviewSchema } from '@/types/schemas/topic-schema';

export type InProgressTopic = {
  id: number;
  title: LocaleString;
  completed: number;
  total: number;
  lastPracticedAt: Date;
  href: string;
};

export async function getInProgressTopics(limit = 3): Promise<{ data: InProgressTopic[] | undefined; error?: string }> {
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (user == undefined) {
      return { data: [] };
    }

    const { data, error } = await supabase
      .from('topic_widget_summary')
      .select('*')
      .filter('last_accessed_at', 'not.is', 'null')
      .order('last_accessed_at', { ascending: false })
      .limit(Math.max(limit * 10, limit));

    if (error) {
      throw error;
    }

    if (data == undefined || data.length === 0) {
      return { data: [] };
    }

    const parsed = z.array(TopicOverviewSchema).safeParse(data);

    if (!parsed.success) {
      throw new Error('Invalid topic_widget_summary format');
    }

    const topics = parsed.data
      .flatMap((topic) => {
        if (topic.lastTrainedAt == undefined) {
          return [];
        }

        const completed = topic.widgets.reduce((sum, widget) => sum + widget.correctAnswers, 0);
        const total = topic.widgets.reduce((sum, widget) => sum + widget.totalQuestions, 0);

        if (total === 0 || completed >= total) {
          return [];
        }

        return [
          {
            id: topic.id,
            title: topic.name,
            completed,
            total,
            lastPracticedAt: topic.lastTrainedAt,
            href: `${Routes.Library}/${topic.id}`,
          },
        ];
      })
      .slice(0, limit);

    return { data: topics };
  } catch (error: unknown) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

import z from 'zod';

import { supabaseServer } from '@/lib/supabase/server';
import { PageInfo, PaginatedResult } from '@/types/pagination';
import { Topic, TopicSchema } from '@/types/schemas/database-schemas';

export async function getRecentTopics(): Promise<{ data: Topic[] | undefined; error?: string }> {
  try {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from('topic_widget_summary')
      .select('*')
      .filter('last_accessed_at', 'not.is', 'null')
      .order('last_accessed_at', { ascending: true })
      .limit(3);

    if (error) {
      throw error;
    }

    if (data != undefined) {
      const result = z.array(TopicSchema).safeParse(data);

      if (result.success) return { data: result.data };
    }

    return { data: [] };
  } catch (error: unknown) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getTopics(
  { page, size, orderBy, ascending }: PageInfo<'Topic'>,
  skipIds: number[]
): Promise<{ data: PaginatedResult<Topic, 'Topic'> | undefined; error?: string }> {
  try {
    const supabase = await supabaseServer();

    const { count, error: countError } = await supabase.from('topics').select('id', { count: 'exact', head: true });

    if (countError) {
      throw countError;
    }

    if (count == undefined) {
      throw new Error('Could not count rows correctly');
    }

    const query = supabase.from('topic_widget_summary').select('*');

    if (skipIds.length > 0) {
      query.not('id', 'in', `(${skipIds.join(',')})`);
    }

    const from = Math.max(page - 1, 0) * size;
    let to = from + size - 1;

    const correctedCount = count - skipIds.length;

    if (from > correctedCount) {
      throw new Error('Out of bounds');
    } else if (to > correctedCount) {
      to = correctedCount;
    }

    query.order(orderBy, { ascending }).order('id', { ascending: true }).range(from, to);

    const { data, error: viewError } = await query;

    if (viewError) {
      throw viewError;
    }

    const totalPages = Math.ceil(count / size);

    if (data != undefined) {
      const array = z.array(TopicSchema).safeParse(data);

      if (array.success) {
        const result: PaginatedResult<Topic, 'Topic'> = {
          items: array.data,
          page,
          size,
          count,
          orderBy,
          ascending,
          totalPages,
        };

        return { data: result };
      }
    }

    throw new Error('Something went wrong');
  } catch (error: unknown) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

'use server';

import z from 'zod';

import { supabaseServer } from '@/lib/supabase/server';
import { QuestionInfo, QuestionInfoSchema } from '@/types/schemas/question-schemas';
import { WidgetFilter } from '@/types/widget';

export async function getQuestions(topicId: number, widgetType: WidgetFilter): Promise<QuestionInfo[]> {
  console.log('getQuestions', topicId, widgetType);

  const supabase = await supabaseServer();

  let query = supabase
    .from('questions_info')
    .select(`*`)
    .eq('topic_id', topicId)
    .or('is_success.is.null,is_success.eq.false')
    .order('updated_at', { ascending: false, nullsFirst: true });

  if (widgetType !== 'all') {
    query = query.eq('widget_type', widgetType);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  if (data === null) {
    return [];
  }

  const parsed = z.array(QuestionInfoSchema).safeParse(data);

  if (parsed.success) return parsed.data;

  return [];
}

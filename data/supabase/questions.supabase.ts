import { supabaseServer } from '@/lib/supabase/server';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { LanguageCode } from '@/services/locale/locale.service';
import { Question } from '@/types/question';
import { WidgetFilter, WidgetType } from '@/types/widget';

export async function getQuestions(topicId: string, widgetType: WidgetFilter): Promise<Question[]> {
  const supabase = await supabaseServer();
  const languageCode = await getServerLanguageCode();

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

  console.log(data);

  return data.map((q) => {
    if (q.widget_type === WidgetType.Quiz) {
      return {
        id: q.id,
        topicId: q.topic_id,
        type: q.widget_type,
        payload: {
          question: q.payload_question.question[languageCode],
          options: q.payload_question.options.map((option: Record<LanguageCode, string>) => option[languageCode]),
        },
      };
    }
    if (q.widget_type === WidgetType.TrueFalse) {
      return {
        id: q.id,
        topicId: q.topic_id,
        type: q.widget_type,
        payload: {
          statement: q.payload_question.statement[languageCode],
          explanation: q.payload_question.explanation[languageCode],
        },
      };
    }

    return {
      id: q.id,
      topicId: q.topic_id,
      type: q.widget_type,
      payload: q.payload_question,
    };
  });
}

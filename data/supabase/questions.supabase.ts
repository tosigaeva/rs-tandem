import { supabaseServer } from '@/lib/supabase/server';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { LanguageCode } from '@/services/locale/locale.service';
import { Question } from '@/types/question';
import { LocaleString } from '@/types/schemas/locale-schemas';
import { WidgetFilter, WidgetType } from '@/types/widget';

export async function getQuestions(topicId: string, widgetType: WidgetFilter): Promise<Question[]> {
  const supabase = await supabaseServer();
  const languageCode = await getServerLanguageCode();

  let query = supabase
    .from('questions')
    .select(
      `
    id,
    widget_type,
    payload_question,
    topic_id
  `
    )
    .eq('topic_id', topicId);

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
    if (q.widget_type === WidgetType.CodeCompletion) {
      return {
        id: q.id,
        topicId: q.topic_id,
        type: q.widget_type,
        payload: {
          ...q.payload_question,
          hints: q.payload_question.hints?.map((hint: LocaleString | string) =>
            typeof hint === 'string' ? hint : (hint[languageCode] ?? hint[LanguageCode.en] ?? '')
          ),
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

import { mockQuestions } from '@/api/questions.mock';
import { supabaseServer } from '@/lib/supabase/server';
import { Question, QuestionResponse } from '@/types/question';
import { WidgetType } from '@/types/widget';

function mapQuestion(response: QuestionResponse): Question {
  switch (response.type) {
    case WidgetType.Quiz: {
      const payload = response.payload;
      return {
        id: response.id,
        topicId: response.topicId,
        type: WidgetType.Quiz,
        payload: {
          question: payload.question,
          options: payload.options,
        },
      };
    }
    case WidgetType.TrueFalse: {
      const payload = response.payload;
      return {
        id: response.id,
        topicId: response.topicId,
        type: WidgetType.TrueFalse,
        payload: {
          statement: payload.statement,
          explanation: payload.explanation,
        },
      };
    }
    case WidgetType.CodeCompletion: {
      const payload = response.payload;
      return {
        id: response.id,
        topicId: response.topicId,
        type: WidgetType.CodeCompletion,
        payload: {
          code: payload.code,
          blanks: payload.blanks,
          hints: payload.hints,
        },
      };
    }
  }
}

export async function getQuestions(
  topicId: string,
  widgetType: WidgetType | undefined = undefined
): Promise<Question[]> {
  if (process.env.MOCK_MODE === 'production') {
    const supabase = await supabaseServer();
    let query = supabase
      .from('question_variant')
      .select(
        `
    id,
    widget_type,
    payload,
    question:question_id (
      topicId
    )
  `
      )
      .eq('question.topicId', topicId);

    // Add widget_type filter only if defined
    if (widgetType !== undefined) {
      query = query.eq('widget_type', widgetType);
    }

    const { data, error } = await query;
    console.log(error);

    return data
      .map((q) => ({
        id: q.id,
        topicId: topicId,
        type: q.widget_type,
        payload: q.payload,
      }))
      .map(mapQuestion);
  }

  return mockQuestions.map(mapQuestion).filter((question) => question?.topicId === topicId);
}

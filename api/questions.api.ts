import { mockQuestions } from '@/api/questions.mock';
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

export async function getQuestions(topicId: string): Promise<Question[]> {
  return mockQuestions.map(mapQuestion).filter((question) => question?.topicId === topicId);
}

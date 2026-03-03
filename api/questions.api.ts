import { mockQuestions } from '@/api/questions.mock';
import { mapToLocale } from '@/lib/enum';
import { Question, QuestionResponse } from '@/types/question';
import { WidgetType } from '@/types/widget';

function mapQuestion(response: QuestionResponse): Question | undefined {
  switch (response.type) {
    case WidgetType.Quiz: {
      const payload = response.payload;
      return {
        id: response.id,
        version: response.version,
        difficulty: response.difficulty,
        tags: response.tags,
        type: WidgetType.Quiz,
        payload: {
          question: mapToLocale(payload.question),
          options: payload.options.map((option) => mapToLocale(option)),
        },
      };
    }
  }

  return undefined;
}

export async function getQuestions(topicId: string): Promise<Question[]> {
  console.log(topicId);
  return mockQuestions.map(mapQuestion).filter((question): question is Question => question !== undefined);
}

export async function getQuestion(topicId: string, questionId: string): Promise<Question | undefined> {
  const questions = await getQuestions(topicId);
  return questions.find((question) => question.id === questionId);
}

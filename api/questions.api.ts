import { mockQuestions } from '@/api/questions.mock';
import { Question } from '@/types/question';

export async function getQuestions(topicId: string): Promise<Question[]> {
  return mockQuestions.filter((question) => question?.topicId === topicId);
}

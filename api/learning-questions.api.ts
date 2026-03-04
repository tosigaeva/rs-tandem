import { getMockQuestions } from '@/api/learning-questions.mock';
import { Question } from '@/types/learning-question';

export async function getQuestions(count: number = 10): Promise<Question[]> {
  return getMockQuestions(count);
}

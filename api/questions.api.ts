import { getMockQuestions } from '@/api/questions.mock';
import { Question } from '@/types/question';

export async function getQuestions(count: number = 10): Promise<Question[]> {
  return getMockQuestions(count);
}

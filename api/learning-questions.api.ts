import { getMockQuestions } from '@/api/learning-questions.mock';
import { Question } from '@/types/learning-question';

export async function getQuestions(): Promise<Question[]> {
  return getMockQuestions();
}

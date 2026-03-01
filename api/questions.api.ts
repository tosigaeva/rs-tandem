import { getMockQuestion } from '@/api/questions.mock';
import { Question } from '@/types/question';

export async function getQuestion(): Promise<Question> {
  return getMockQuestion();
}

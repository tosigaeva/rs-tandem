import { getMockLearningQuestion } from '@/api/questions.mock';
import { Question } from '@/types/question';

export async function getTopicsOverview(): Promise<Question> {
  return getMockLearningQuestion();
}

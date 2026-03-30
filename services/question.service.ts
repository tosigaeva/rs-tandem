import { getAllQuestions } from '@/api/question.api';
import { QuestionAdminListItem } from '@/types/schemas/question-schemas';

export const QuestionService = {
  loadQuestionAdminList: (): Promise<{
    data: QuestionAdminListItem[] | undefined;
    error?: string;
  }> => {
    return getAllQuestions();
  },
};

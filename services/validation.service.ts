import { getValidationQuestion } from '@/data/supabase/validate.supabase';

import { validationStrategies } from './validation/strategies';

export const ValidationService = {
  validateAnswer: async (questionId: string, answer: unknown): Promise<boolean | undefined> => {
    const question = await getValidationQuestion(questionId);

    if (question.payloadAnswer === null) {
      return undefined;
    }

    return validationStrategies[question.widgetType].validate({
      answer,
      question,
    });
  },
};

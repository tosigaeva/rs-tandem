import { getValidationQuestion } from '@/data/supabase/validate.supabase';
import { ValidationResult } from '@/types/validation';

import { validationStrategies } from './validation/strategies';

export const ValidationService = {
  validateAnswer: async (questionId: number, answer: unknown): Promise<ValidationResult> => {
    const question = await getValidationQuestion(questionId);

    if (question.payloadAnswer === null) {
      return { isCorrect: undefined };
    }

    return validationStrategies[question.widgetType].validate({
      answer,
      question,
    });
  },
};

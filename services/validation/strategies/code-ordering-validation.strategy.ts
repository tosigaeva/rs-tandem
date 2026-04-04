import { CodeOrderingPayloadAnswerSchema } from '@/types/schemas/question-payload-schema';

import { ValidationStrategy } from './types';

export const codeOrderingValidationStrategy: ValidationStrategy = {
  validate: async ({ answer, question }) => {
    const answerResult = await CodeOrderingPayloadAnswerSchema.safeParseAsync(question.payloadAnswer);

    if (!answerResult.success) {
      return { isCorrect: undefined };
    }

    if (Array.isArray(answer) && answer.every((item) => typeof item === 'string')) {
      const submittedAnswers = answer.map((item) => item.trim());
      const expectedAnswers = answerResult.data.answers;

      if (expectedAnswers !== undefined) {
        const blankResults = expectedAnswers.map((value, index) => value === submittedAnswers[index]);

        return {
          isCorrect: blankResults.every(Boolean),
          details: {
            blankResults,
          },
        };
      }
    }

    return { isCorrect: undefined };
  },
};

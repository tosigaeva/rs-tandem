import { CodeCompletionPayloadAnswerSchema } from '@/types/schemas/question-payload-schema';

import { isEqualNumberArray, parseNumberArray } from './helpers';
import { ValidationStrategy } from './types';

export const codeCompletionValidationStrategy: ValidationStrategy = {
  validate: async ({ answer, question }) => {
    const answerResult = await CodeCompletionPayloadAnswerSchema.safeParseAsync(question.payloadAnswer);
    const submittedOrder = parseNumberArray(answer);

    if (!answerResult.success || submittedOrder === undefined) {
      return;
    }

    return isEqualNumberArray(submittedOrder, answerResult.data.correctOrder);
  },
};

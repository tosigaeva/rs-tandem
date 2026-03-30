'use server';
import { validateAnswer as mockValidateAnswer } from '@/data/mocks/validate.mock';
import { ValidationService } from '@/services/validation.service';

export async function validateAnswer(questionId: string, answer: unknown): Promise<boolean | undefined> {
  if (process.env.MOCK_MODE === 'true') {
    return mockValidateAnswer();
  }

  return ValidationService.validateAnswer(questionId, answer);
}

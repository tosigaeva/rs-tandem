'use server';
import { validateAnswer as mockValidateAnswer } from '@/data/mocks/validate.mock';
import { ValidationService } from '@/services/validation.service';

export async function validateAnswer(questionId: number, answer: unknown): Promise<boolean | undefined> {
  console.log('we here');

  if (process.env.MOCK_MODE === 'true') {
    return mockValidateAnswer();
  }

  return ValidationService.validateAnswer(questionId, answer);
}

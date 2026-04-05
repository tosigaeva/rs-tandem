'use server';
import { validateAnswer as mockValidateAnswer } from '@/data/mocks/validate.mock';
import { ValidationService } from '@/services/validation.service';
import { ValidationResult } from '@/types/validation';

export async function validateAnswer(questionId: string, answer: unknown): Promise<ValidationResult> {
  if (process.env.MOCK_MODE === 'true') {
    return mockValidateAnswer();
  }

  return ValidationService.validateAnswer(questionId, answer);
}

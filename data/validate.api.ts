'use server';
import { AsyncSorterAnswer } from '@/components/library/widget/ui/async-sorter/type';
import { validateAnswer as mockValidateAnswer } from '@/data/mocks/validate.mock';
import { ValidationService } from '@/services/validation.service';
import { ValidationResult } from '@/types/validation';

const mockAsyncSorterCorrectAnswer: AsyncSorterAnswer = {
  callStack: ['b1', 'b4'],
  microtasks: ['b3'],
  macrotasks: ['b2'],
  output: ['b1', 'b4', 'b3', 'b2'],
};

export async function validateAnswer(questionId: string, answer: unknown): Promise<ValidationResult> {
  if (process.env.MOCK_MODE === 'true') {
    return mockValidateAnswer();
  }

  if (questionId === 'as-001') {
    const userAnswer = answer as AsyncSorterAnswer;
    const result: Record<keyof AsyncSorterAnswer, boolean[]> = {
      callStack: [],
      microtasks: [],
      macrotasks: [],
      output: [],
    };

    (Object.keys(mockAsyncSorterCorrectAnswer) as (keyof AsyncSorterAnswer)[]).forEach((zone) => {
      const userZone = userAnswer[zone] || [];
      const correctZone = mockAsyncSorterCorrectAnswer[zone];

      result[zone] = userZone.map((blockId, index) => {
        const existsInCorrectZone = correctZone.includes(blockId);
        const correctPosition = correctZone[index] === blockId;

        return existsInCorrectZone && correctPosition;
      });
    });
    return result;
  }

  return ValidationService.validateAnswer(questionId, answer);
}

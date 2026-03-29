import { AsyncSorterAnswer } from '@/components/library/widget/ui/async-sorter/type';

export const mockCorrectAnswer: AsyncSorterAnswer = {
  callStack: ['b1', 'b4'],
  microtasks: ['b3'],
  macrotasks: ['b2'],
  output: ['b1', 'b4', 'b3', 'b2'],
};

export async function validateAnswer(
  questionId: string,
  answer?: string | AsyncSorterAnswer,
): Promise<boolean | Record<keyof AsyncSorterAnswer, boolean[]> | undefined> {
  if (questionId === 'quiz-001') {
    return answer === 'object';
  }

  if (questionId === 'tf-001') {
    return answer === 'true';
  }

  if (questionId === 'cc-001') {
    return answer === 'filter';
  }

  if (questionId === 'big-o-001') {
    return answer === 'O(n)';
  }

  if (
    questionId === 'Learning-1' ||
    questionId === 'Learning-2' ||
    questionId === 'Learning-3' ||
    questionId === 'Learning-4' ||
    questionId === 'Learning-5' ||
    questionId === 'Learning-6' ||
    questionId === 'Learning-7' ||
    questionId === 'Learning-8' ||
    questionId === 'Learning-9' ||
    questionId === 'Learning-10'
  ) {
    return answer === 'true';
  }

  if (questionId === 'as-001') {
    const userAnswer = answer as AsyncSorterAnswer;
    const result: Record<keyof AsyncSorterAnswer, boolean[]> = {
      callStack: [],
      microtasks: [],
      macrotasks: [],
      output: [],
    };

    (Object.keys(mockCorrectAnswer) as (keyof AsyncSorterAnswer)[]).forEach((zone) => {
      const userZone = userAnswer[zone] || [];
      const correctZone = mockCorrectAnswer[zone];

      result[zone] = userZone.map((blockId, index) => {
        const existsInCorrectZone = correctZone.includes(blockId);
        const correctPosition = correctZone[index] === blockId;

        return existsInCorrectZone && correctPosition;
      });
    });
    return result;
  }

  return undefined;
}

import { QuestionsResponse } from '@/types/question';
import { WidgetType } from '@/types/widget';

export const mockQuestions: QuestionsResponse = [
  {
    id: 'quiz-001',
    topicId: '1',
    type: WidgetType.Quiz,
    payload: {
      question: 'What does typeof null return?',
      options: ['null', 'undefined', 'object', 'NaN'],
    },
  },
  {
    id: 'tf-001',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Promise.all() returns results in order of completion',
      explanation: 'Promise.all() preserves input array order, regardless of completion time',
    },
  },
  {
    id: 'cc-001',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'const result = arr.___(x => x > 0);',
      blanks: ['___'],
      hints: ['This method returns a new array with elements that pass the test'],
    },
  },
];

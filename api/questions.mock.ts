import { QuestionsResponse } from '@/types/question';

export const mockQuestions: QuestionsResponse = [
  {
    id: 'quiz-001',
    topicId: '1',
    type: 'quiz',
    version: 1,
    difficulty: 1,
    tags: ['typeof', 'basics'],
    payload: {
      question: {
        ru: 'Что вернет typeof null?',
        en: 'What does typeof null return?',
      },
      options: [
        { ru: 'null', en: 'null' },
        { ru: 'undefined', en: 'undefined' },
        { ru: 'object', en: 'object' },
        { ru: 'NaN', en: 'NaN' },
      ],
    },
  },
  {
    id: 'tf-001',
    topicId: '1',
    type: 'true-false',
    version: 1,
    difficulty: 1,
    tags: ['promises', 'order'],
    payload: {
      statement: {
        ru: 'Promise.all() возвращает результаты в порядке завершения промисов',
        en: 'Promise.all() returns results in order of completion',
      },
      explanation: {
        ru: 'Promise.all() сохраняет порядок входного массива, независимо от времени выполнения',
        en: 'Promise.all() preserves input array order, regardless of completion time',
      },
    },
  },
  {
    id: 'cc-001',
    topicId: '1',
    type: 'code-completion',
    version: 1,
    difficulty: 2,
    tags: ['array-methods', 'filter'],
    payload: {
      code: 'const result = arr.___(x => x > 0);',
      blanks: ['___'],
      hints: [
        {
          ru: 'Этот метод возвращает новый массив с элементами, прошедшими проверку',
          en: 'This method returns a new array with elements that pass the test',
        },
      ],
    },
  },
];

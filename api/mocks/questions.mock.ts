import { Question } from '@/types/question';
import { WidgetType } from '@/types/widget';

export const mockQuestions: Question[] = [
  {
    id: 'quiz-001',
    topicId: '1',
    type: WidgetType.Quiz,
    payload: {
      question: 'What does <i>typeof null</i> return? <code>example of code \n with new line</code>',
      options: ['null', 'undefined', 'object', 'NaN'],
    },
  },
  {
    id: 'tf-001',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: '<i>Promise.all()</i> returns results in order of completion',
      explanation: '<i>Promise.all()</i> preserves input array order, regardless of completion time',
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
  {
    id: 'big-o-001',
    topicId: '1',
    type: WidgetType.BigONotation,
    payload: {
      question: 'What is the time complexity of this algorithm?',
      codeExample: '<code>for (let i = 0; i < n; i++) { \n  console.log(i); \n}</code>',
    },
  },
  {
    id: 'Learning-1',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Closure',
    },
  },
  {
    id: 'Learning-2',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Hoisting',
    },
  },
  {
    id: 'Learning-3',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Event Loop',
    },
  },
  {
    id: 'Learning-4',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Promise',
    },
  },
  {
    id: 'Learning-5',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Callback Function',
    },
  },
  {
    id: 'Learning-6',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Arrow Function',
    },
  },
  {
    id: 'Learning-7',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Prototype',
    },
  },
  {
    id: 'Learning-8',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Destructuring',
    },
  },
  {
    id: 'Learning-9',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Strict Mode',
    },
  },
  {
    id: 'Learning-10',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      question: 'Debouncing',
    },
  },
];

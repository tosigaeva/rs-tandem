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
    id: 'Learning-1',
    topicId: '1',
    type: WidgetType.Quiz,
    payload: {
      question: 'Closure',
      options: ['Closure', 'undefined', 'object', 'NaN'],
    },
  },
  {
    id: 'Learning-2',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Hoisting',
      explanation: '<i>Hoisting()</i> preserves input array order, regardless of completion time',
    },
  },
  {
    id: 'Learning-3',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'Event Loop',
      blanks: ['___'],
      hints: ['This method returns a new array with elements that pass the test'],
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
    type: WidgetType.Quiz,
    payload: {
      question: 'Callback Function',
      options: ['null', 'Callback Function', 'object', 'NaN'],
    },
  },
  {
    id: 'Learning-6',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Arrow Function',
      explanation: '<i>Arrow Function()</i> preserves input array order, regardless of completion time',
    },
  },
  {
    id: 'Learning-7',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'Prototype',
      blanks: ['___'],
      hints: ['This method returns a new array with elements that pass the test'],
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
    type: WidgetType.Quiz,
    payload: {
      question: 'Strict Mode',
      options: ['null', 'Callback Function', 'Strict Mode', 'NaN'],
    },
  },
  {
    id: 'Learning-10',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Debouncing',
      explanation: '<i>Debouncing()</i> preserves input array order, regardless of completion time',
    },
  },
];

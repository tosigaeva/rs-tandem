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
    id: 'cc-002',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'const result = arr.___(x => x > 0).___(x => x * 2);',
      blanks: ['___', '___'],
      hints: ['This method filters elements based on a condition', 'This method transforms each element of the array'],
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
      term: 'Closure',
      definition:
        'A function that remembers and can access variables from its lexical scope even after the outer function has finished executing.',
    },
  },
  {
    id: 'Learning-2',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Hoisting',
      definition:
        'JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.',
    },
  },
  {
    id: 'Learning-3',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Event Loop',
      definition:
        'The mechanism that handles asynchronous callbacks by continuously checking the call stack and task queue.',
    },
  },
  {
    id: 'Learning-4',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Promise',
      definition: 'An object representing the eventual completion or failure of an asynchronous operation.',
    },
  },
  {
    id: 'Learning-5',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Callback Function',
      definition: 'A function passed as an argument to another function to be executed later.',
    },
  },
  {
    id: 'Learning-6',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Arrow Function',
      definition: 'A shorter function syntax introduced in ES6 that does not have its own this binding.',
    },
  },
  {
    id: 'Learning-7',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Prototype',
      definition: 'An object from which other objects inherit properties and methods in JavaScript.',
    },
  },
  {
    id: 'Learning-8',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Destructuring',
      definition:
        'A syntax that allows extracting values from arrays or properties from objects into distinct variables.',
    },
  },
  {
    id: 'Learning-9',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Strict Mode',
      definition: 'A restricted variant of JavaScript that eliminates some silent errors and prevents unsafe actions.',
    },
  },
  {
    id: 'Learning-10',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: 'Debouncing',
      definition:
        'A technique that limits how often a function is executed by delaying its invocation until after a specified time has passed.',
    },
  },
];

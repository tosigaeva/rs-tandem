import { Question } from '@/types/question';
import { WidgetType } from '@/types/widget';

export const mockLearningQuestions: Question[] = [
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

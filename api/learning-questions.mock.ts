import { Question } from '@/types/learning-question';

const mockLearningQuestions: Question[] = [
  {
    id: 'Learning-1',
    payload: {
      question: 'Closure',
      correctAnswer:
        'A function that remembers and can access variables from its lexical scope even after the outer function has finished executing.',
    },
  },
  {
    id: 'Learning-2',
    payload: {
      question: 'Hoisting',
      correctAnswer:
        'JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.',
    },
  },
  {
    id: 'Learning-3',
    payload: {
      question: 'Event Loop',
      correctAnswer:
        'The mechanism that handles asynchronous callbacks by continuously checking the call stack and task queue.',
    },
  },
  {
    id: 'Learning-4',
    payload: {
      question: 'Promise',
      correctAnswer: 'An object representing the eventual completion or failure of an asynchronous operation.',
    },
  },
  {
    id: 'Learning-5',
    payload: {
      question: 'Callback Function',
      correctAnswer: 'A function passed as an argument to another function to be executed later.',
    },
  },
  {
    id: 'Learning-6',
    payload: {
      question: 'Arrow Function',
      correctAnswer: 'A shorter function syntax introduced in ES6 that does not have its own this binding.',
    },
  },
  {
    id: 'Learning-7',
    payload: {
      question: 'Prototype',
      correctAnswer: 'An object from which other objects inherit properties and methods in JavaScript.',
    },
  },
  {
    id: 'Learning-8',
    payload: {
      question: 'Destructuring',
      correctAnswer:
        'A syntax that allows extracting values from arrays or properties from objects into distinct variables.',
    },
  },
  {
    id: 'Learning-9',
    payload: {
      question: 'Strict Mode',
      correctAnswer:
        'A restricted variant of JavaScript that eliminates some silent errors and prevents unsafe actions.',
    },
  },
  {
    id: 'Learning-10',
    payload: {
      question: 'Debouncing',
      correctAnswer:
        'A technique that limits how often a function is executed by delaying its invocation until after a specified time has passed.',
    },
  },
];

export function getMockQuestions(): Question[] {
  return mockLearningQuestions;
}

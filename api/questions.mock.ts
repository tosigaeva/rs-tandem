import { Question } from '@/types/question';

const mockLearningQuestions: Question[] = [
  {
    id: 'Learning-1',
    payload: {
      question: 'What is the output of: console.log(typeof null);',
      options: ['object', 'null', 'undefined', 'boolean'],
      correctAnswer: 'object',
    },
  },
  {
    id: 'Learning-2',
    payload: {
      question: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
      options: ['var', 'let', 'const', 'both let and const'],
      correctAnswer: 'both let and const',
    },
  },
  {
    id: 'Learning-3',
    payload: {
      question: 'What will be logged? console.log(1 + "2" + 3);',
      options: ['6', '"123"', '"33"', 'NaN'],
      correctAnswer: '"123"',
    },
  },
  {
    id: 'Learning-4',
    payload: {
      question: 'Which method converts a JSON string into a JavaScript object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.convert()'],
      correctAnswer: 'JSON.parse()',
    },
  },
  {
    id: 'Learning-5',
    payload: {
      question: 'What is the default return value of a function that does not explicitly return anything?',
      options: ['null', 'undefined', '0', 'false'],
      correctAnswer: 'undefined',
    },
  },
  {
    id: 'Learning-6',
    payload: {
      question: 'Which TypeScript feature allows defining a custom type with specific property types?',
      options: ['enum', 'interface', 'namespace', 'module'],
      correctAnswer: 'interface',
    },
  },
  {
    id: 'Learning-7',
    payload: {
      question: 'What does the "===" operator do in JavaScript?',
      options: ['Compares value only', 'Compares type only', 'Compares value and type', 'Assigns a value'],
      correctAnswer: 'Compares value and type',
    },
  },
  {
    id: 'Learning-8',
    payload: {
      question: 'What will be the output of: console.log(Boolean(""));',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 'false',
    },
  },
  {
    id: 'Learning-9',
    payload: {
      question: 'Which array method creates a new array with elements that pass a test?',
      options: ['map()', 'filter()', 'reduce()', 'forEach()'],
      correctAnswer: 'filter()',
    },
  },
  {
    id: 'Learning-10',
    payload: {
      question: 'What is the purpose of the "readonly" modifier in TypeScript?',
      options: [
        'Prevents variable reassignment',
        'Prevents property modification',
        'Makes a variable global',
        'Disables type checking',
      ],
      correctAnswer: 'Prevents property modification',
    },
  },
  {
    id: 'Learning-11',
    payload: {
      question: 'What will be logged? console.log([] == false);',
      options: ['true', 'false', 'undefined', 'TypeError'],
      correctAnswer: 'true',
    },
  },
  {
    id: 'Learning-12',
    payload: {
      question: 'Which TypeScript utility type makes all properties optional?',
      options: ['Required<T>', 'Readonly<T>', 'Partial<T>', 'Pick<T>'],
      correctAnswer: 'Partial<T>',
    },
  },
  {
    id: 'Learning-13',
    payload: {
      question: 'What does the Array.prototype.map() method return?',
      options: ['A modified original array', 'A new transformed array', 'A single value', 'Nothing'],
      correctAnswer: 'A new transformed array',
    },
  },
  {
    id: 'Learning-14',
    payload: {
      question: 'What is a closure in JavaScript?',
      options: [
        'A function without a name',
        'A function bundled with its lexical environment',
        'An immediately invoked function',
        'A block-scoped variable',
      ],
      correctAnswer: 'A function bundled with its lexical environment',
    },
  },
  {
    id: 'Learning-15',
    payload: {
      question: 'Which keyword is used to define a type alias in TypeScript?',
      options: ['interface', 'alias', 'type', 'define'],
      correctAnswer: 'type',
    },
  },
  {
    id: 'Learning-16',
    payload: {
      question: 'What will be logged? console.log(typeof NaN);',
      options: ['number', 'NaN', 'undefined', 'object'],
      correctAnswer: 'number',
    },
  },
  {
    id: 'Learning-17',
    payload: {
      question: 'Which method is used to handle fulfilled or rejected promises?',
      options: ['then()', 'catch()', 'finally()', 'All of the above'],
      correctAnswer: 'All of the above',
    },
  },
  {
    id: 'Learning-18',
    payload: {
      question: 'What does the "unknown" type represent in TypeScript?',
      options: [
        'Any value without type checking',
        'A safer alternative to any',
        'A value that must be a string',
        'A deprecated type',
      ],
      correctAnswer: 'A safer alternative to any',
    },
  },
  {
    id: 'Learning-19',
    payload: {
      question: 'What is the result of: console.log(0 || "Hello");',
      options: ['0', '"Hello"', 'false', 'undefined'],
      correctAnswer: '"Hello"',
    },
  },
  {
    id: 'Learning-20',
    payload: {
      question: 'What does the "as" keyword do in TypeScript?',
      options: ['Renames a variable', 'Performs type assertion', 'Creates a new type', 'Imports a module'],
      correctAnswer: 'Performs type assertion',
    },
  },
];

export function getMockQuestions(count: number = 10): Question[] {
  return mockLearningQuestions.slice(0, count);
}

import { Question } from '@/types/question';
import { WidgetType } from '@/types/widget';

export const mockLearningQuestions: Question[] = [
  {
    id: 'Learning-1',
    topicId: '1',
    type: WidgetType.Quiz,
    payload: {
      question: 'Closure',
      options: [],
    },
  },
  {
    id: 'Learning-2',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Hoisting',
      explanation: '',
    },
  },
  {
    id: 'Learning-3',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'Event Loop',
      blanks: [],
      hints: [],
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
      options: [],
    },
  },
  {
    id: 'Learning-6',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Arrow Function',
      explanation: '',
    },
  },
  {
    id: 'Learning-7',
    topicId: '1',
    type: WidgetType.CodeCompletion,
    payload: {
      code: 'Prototype',
      blanks: [],
      hints: [],
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
      options: [],
    },
  },
  {
    id: 'Learning-10',
    topicId: '1',
    type: WidgetType.TrueFalse,
    payload: {
      statement: 'Debouncing',
      explanation: '',
    },
  },
];

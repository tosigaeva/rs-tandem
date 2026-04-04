import { Question } from '@/types/question';
import { WidgetType } from '@/types/widget';

export const mockQuestions: Question[] = [
  {
    id: 'co-001',
    topicId: '1',
    type: WidgetType.CodeOrdering,
    payload: {
      description: 'Реализуй debounce функцию',
      lines: [
        'return function(...args) {',
        'let timeout;',
        'clearTimeout(timeout);',
        'timeout = setTimeout(() => fn(...args), delay);',
        '};',
      ],
    },
  },
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
      question: {
        en: 'What is the time complexity of this algorithm?',
        ru: 'Какова временная сложность этого алгоритма?',
        by: 'Якая часавая складанасць гэтага алгарытму?',
      },
      codeExample: '<code>for (let i = 0; i < n; i++) { \n  console.log(i); \n}</code>',
    },
  },
  {
    id: 'Learning-1',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Closure',
        ru: 'Замыкание',
        by: 'Замыканне',
      },
      definition: {
        en: 'A function that remembers and can access variables from its lexical scope even after the outer function has finished executing.',
        ru: 'Функция, которая запоминает и может обращаться к переменным из своей лексической области видимости даже после того, как внешняя функция завершила выполнение.',
        by: 'Функцыя, якая запамінае і можа звяртацца да зменных са сваёй лексічнай вобласці бачнасці нават пасля таго, як вонкавая функцыя завяршыла выкананне.',
      },
    },
  },
  {
    id: 'Learning-2',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Hoisting',
        ru: 'Поднятие (Hoisting)',
        by: 'Узняцце (Hoisting)',
      },
      definition: {
        en: 'JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.',
        ru: 'Поведение в JavaScript, при котором объявления переменных и функций перемещаются в начало их области видимости на этапе компиляции.',
        by: 'Паводзіны ў JavaScript, пры якіх аб’явы зменных і функцый перамяшчаюцца ў пачатак іх вобласці бачнасці на этапе кампіляцыі.',
      },
    },
  },
  {
    id: 'Learning-3',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Event Loop',
        ru: 'Цикл событий (Event Loop)',
        by: 'Цыкл падзей (Event Loop)',
      },
      definition: {
        en: 'The mechanism that handles asynchronous callbacks by continuously checking the call stack and task queue.',
        ru: 'Механизм, который обрабатывает асинхронные колбэки, постоянно проверяя стек вызовов и очередь задач.',
        by: 'Механізм, які апрацоўвае асінхронныя колбэкі, пастаянна правяраючы стэк выклікаў і чаргу задач.',
      },
    },
  },
  {
    id: 'Learning-4',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Promise',
        ru: 'Промис (Promise)',
        by: 'Проміс (Promise)',
      },
      definition: {
        en: 'An object representing the eventual completion or failure of an asynchronous operation.',
        ru: 'Объект, представляющий результат (успешный или нет) асинхронной операции.',
        by: 'Аб’ект, які прадстаўляе вынік (паспяховы ці не) асінхроннай аперацыі.',
      },
    },
  },
  {
    id: 'Learning-5',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Callback Function',
        ru: 'Функция обратного вызова (Callback)',
        by: 'Функцыя зваротнага выкліку (Callback)',
      },
      definition: {
        en: 'A function passed as an argument to another function to be executed later.',
        ru: 'Функция, переданная в другую функцию в качестве аргумента для последующего вызова.',
        by: 'Функцыя, перададзеная ў іншую функцыю ў якасці аргумента для наступнага выкліку.',
      },
    },
  },
  {
    id: 'Learning-6',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Arrow Function',
        ru: 'Стрелочная функция',
        by: 'Стрэлачная функцыя',
      },
      definition: {
        en: 'A shorter function syntax introduced in ES6 that does not have its own this binding.',
        ru: 'Более краткий синтаксис функций, введенный в ES6, который не имеет собственной привязки this.',
        by: 'Больш кароткі сінтаксіс функцый, уведзены ў ES6, які не мае ўласнай прывязкі this.',
      },
    },
  },
  {
    id: 'Learning-7',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Prototype',
        ru: 'Прототип',
        by: 'Прататып',
      },
      definition: {
        en: 'An object from which other objects inherit properties and methods in JavaScript.',
        ru: 'Объект, от которого другие объекты наследуют свойства и методы в JavaScript.',
        by: 'Аб’ект, ад якога іншыя аб’екты ўспадкоўваюць уласцівасці і метады ў JavaScript.',
      },
    },
  },
  {
    id: 'Learning-8',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Destructuring',
        ru: 'Деструктуризация',
        by: 'Дэструктурызацыя',
      },
      definition: {
        en: 'A syntax that allows extracting values from arrays or properties from objects into distinct variables.',
        ru: 'Синтаксис, позволяющий извлекать значения из массивов или свойства из объектов в отдельные переменные.',
        by: 'Сінтаксіс, які дазваляе здабываць значэнні з масіваў або ўласцівасці з аб’ектаў у асобныя зменныя.',
      },
    },
  },
  {
    id: 'Learning-9',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Strict Mode',
        ru: 'Строгий режим (Strict Mode)',
        by: 'Строгі рэжым (Strict Mode)',
      },
      definition: {
        en: 'A restricted variant of JavaScript that eliminates some silent errors and prevents unsafe actions.',
        ru: 'Ограниченный вариант JavaScript, который устраняет некоторые неявные ошибки и предотвращает небезопасные действия.',
        by: 'Абмежаваны варыянт JavaScript, які ліквідуе некаторыя няяўныя памылкі і прадухіляе небяспечныя дзеянні.',
      },
    },
  },
  {
    id: 'Learning-10',
    topicId: '1',
    type: WidgetType.FlipCard,
    payload: {
      term: {
        en: 'Debouncing',
        ru: 'Устранение дребезга (Debouncing)',
        by: 'Ухіленне дрыгацення (Debouncing)',
      },
      definition: {
        en: 'A technique that limits how often a function is executed by delaying its invocation until after a specified time has passed.',
        ru: 'Метод, ограничивающий частоту выполнения функции путем задержки её вызова до истечения определенного времени.',
        by: 'Метад, які абмяжоўвае частату выканання функцыі шляхам затрымкі яе выкліку да заканчэння пэўнага часу.',
      },
    },
  },
];

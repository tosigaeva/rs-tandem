import { mockQuestions } from '@/api/mocks/questions.mock';
import { mockLibraryTopics, mockTopics } from '@/api/mocks/topics.mock';
import { FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { BaseQuestion, Question } from '@/types/question';
import { LibraryTopicsResponse, Topic } from '@/types/topic';
import { WidgetType } from '@/types/widget';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  return mockLibraryTopics;
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  return mockTopics.find((topic) => topic.id === topicId);
}

export async function getQuestions(topicId: string, widgetType?: WidgetType): Promise<Question[]> {
  let questions = mockQuestions;

  questions = questions.filter((q) => q.topicId === topicId);

  if (widgetType !== undefined) {
    questions = questions.filter((q) => q.type === widgetType);
  }

  return questions;
}

export async function validateQuestion(questionId: string, answer: string): Promise<boolean | undefined> {
  if (questionId === 'quiz-001') {
    return answer === 'null';
  }

  if (questionId === 'tf-001') {
    return answer === 'true';
  }

  if (questionId === 'cc-001') {
    return answer === 'filter';
  }

  if (questionId === 'big-o-001') {
    return answer === 'O(n)';
  }

  return undefined;
}

export function getFlipQuestions(): (BaseQuestion & FlipCardWidget)[] {
  return mockQuestions.filter((question) => question.type === WidgetType.FlipCard);
}

export async function getAnswer(questionId: string): Promise<string> {
  if (questionId === 'Learning-1')
    return 'A function that remembers and can access variables from its lexical scope even after the outer function has finished executing.';
  if (questionId === 'Learning-2')
    return 'JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.';
  if (questionId === 'Learning-3')
    return 'The mechanism that handles asynchronous callbacks by continuously checking the call stack and task queue.';
  if (questionId === 'Learning-4')
    return 'An object representing the eventual completion or failure of an asynchronous operation.';
  if (questionId === 'Learning-5') return 'A function passed as an argument to another function to be executed later.';
  if (questionId === 'Learning-6')
    return 'A shorter function syntax introduced in ES6 that does not have its own this binding.';
  if (questionId === 'Learning-7')
    return 'An object from which other objects inherit properties and methods in JavaScript.';
  if (questionId === 'Learning-8')
    return 'A syntax that allows extracting values from arrays or properties from objects into distinct variables.';
  if (questionId === 'Learning-9')
    return 'A restricted variant of JavaScript that eliminates some silent errors and prevents unsafe actions.';
  if (questionId === 'Learning-10')
    return 'A technique that limits how often a function is executed by delaying its invocation until after a specified time has passed.';

  return '';
}

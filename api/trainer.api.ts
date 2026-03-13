import { mockLearningQuestions } from '@/api/mocks/learning-questions.mock';
import { mockQuestions } from '@/api/mocks/questions.mock';
import { mockTopics, mockUserTopics } from '@/api/mocks/topics.mock';
import { FlipCardWidget } from '@/components/library/widget/ui/flip-card/type';
import { BaseQuestion, Question } from '@/types/question';
import { LibraryTopicsResponse, Topic } from '@/types/topic';
import { WidgetType } from '@/types/widget';

const DEFAULT_LIMIT = 6;

export async function getTopicsOverview(
  page: number = 1,
  limit: number = DEFAULT_LIMIT
): Promise<LibraryTopicsResponse> {
  const start = (page - 1) * limit;
  const items = mockTopics.slice(start, start + limit);

  const paginatedTopics = {
    items,
    pagination: {
      page,
      limit,
      total: mockTopics.length,
      totalPages: Math.ceil(mockTopics.length / limit),
    },
  };

  return {
    userTopics: mockUserTopics,
    topics: paginatedTopics,
  };
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  return mockTopics.find((topic) => topic.id === topicId);
}

export async function getQuestions(topicId: string): Promise<Question[]> {
  return mockQuestions.filter((question) => question?.topicId === topicId);
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
  return mockLearningQuestions.map((question) => {
    let payload: { question: string } = { question: '' };
    switch (question.type) {
      case WidgetType.Quiz: {
        payload = {
          question: question.payload.question,
        };
        break;
      }
      case WidgetType.TrueFalse: {
        payload = {
          question: question.payload.statement,
        };
        break;
      }
      case WidgetType.CodeCompletion: {
        payload = {
          question: question.payload.code,
        };
        break;
      }
      case WidgetType.FlipCard: {
        payload = {
          question: question.payload.question,
        };
        break;
      }
    }

    return {
      id: question.id,
      topicId: question.topicId,
      type: WidgetType.FlipCard,
      payload: payload,
    };
  });
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

import { mockLearningQuestions } from '@/api/mocks/learning-questions.mock';
import { mockQuestions } from '@/api/mocks/questions.mock';
import { mockLibraryTopics, mockTopics } from '@/api/mocks/topics.mock';
import { Question } from '@/types/question';
import { LibraryTopicsResponse, Topic } from '@/types/topic';

export async function getTopicsOverview(): Promise<LibraryTopicsResponse> {
  return mockLibraryTopics;
}

export async function getTopic(topicId: string): Promise<Topic | undefined> {
  return mockTopics.find((topic) => topic.id === topicId);
}

export async function getQuestions(topicId: string): Promise<Question[]> {
  return mockQuestions.filter((question) => question?.topicId === topicId);
}

export async function validateAnswer(questionId: string, answer: unknown): Promise<boolean | undefined> {
  if (questionId === 'quiz-001') {
    return answer === 'object';
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

  if (
    questionId === 'Learning-1' ||
    questionId === 'Learning-2' ||
    questionId === 'Learning-3' ||
    questionId === 'Learning-4' ||
    questionId === 'Learning-5' ||
    questionId === 'Learning-6' ||
    questionId === 'Learning-7' ||
    questionId === 'Learning-8' ||
    questionId === 'Learning-9' ||
    questionId === 'Learning-10'
  ) {
    return answer === 'true';
  }

  return undefined;
}

export async function getFlipQuestions(topicId: string): Promise<Question[]> {
  return mockLearningQuestions.filter((question) => question?.topicId === topicId);
}

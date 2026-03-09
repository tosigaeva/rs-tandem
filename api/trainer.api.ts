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

  return undefined;
}

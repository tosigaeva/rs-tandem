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

  return Math.random() < 0.5;
}

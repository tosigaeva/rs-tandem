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

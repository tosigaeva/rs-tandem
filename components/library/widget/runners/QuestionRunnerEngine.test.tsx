import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestionRunnerEngine from '@/components/library/widget/runners/QuestionRunnerEngine';
import { trackQuestionAttempt } from '@/data/activity.action';
import { validateAnswer } from '@/data/validate.api';
import { Question } from '@/types/question';
import { WidgetType } from '@/types/widget';

jest.mock('@/data/validate.api', () => ({
  validateAnswer: jest.fn(),
}));

jest.mock('@/data/activity.action', () => ({
  trackQuestionAttempt: jest.fn().mockResolvedValue(1),
}));

describe('QuestionRunnerEngine', () => {
  it('shows a loader while answer validation is in flight', async () => {
    const user = userEvent.setup();
    let resolveValidation!: (value: { isCorrect: boolean }) => void;
    const validateAnswerMock = jest.mocked(validateAnswer);

    validateAnswerMock.mockImplementation(
      () =>
        new Promise<{ isCorrect: boolean }>((resolve) => {
          resolveValidation = resolve;
        })
    );

    const questions: Question[] = [
      { id: 'q1', topicId: 't1', type: WidgetType.Quiz, payload: { question: 'Q1', options: ['a'] } },
    ];

    render(
      <QuestionRunnerEngine questions={questions}>
        {({ onCheck, isValidating }) => (
          <button disabled={isValidating} onClick={() => void onCheck('answer')}>
            Submit
          </button>
        )}
      </QuestionRunnerEngine>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByLabelText('Validating answer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    resolveValidation({ isCorrect: true });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
      expect(screen.queryByLabelText('Validating answer')).not.toBeInTheDocument();
      expect(trackQuestionAttempt).toHaveBeenCalledWith({ questionId: 'q1', isSuccess: true });
    });
  });
});

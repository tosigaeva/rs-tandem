import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestionRunnerEngine from '@/components/library/widget/runners/QuestionRunnerEngine';
import { trackQuestionAttempt } from '@/data/activity.action';
import { validateAnswer } from '@/data/validate.api';
import { QuestionInfo } from '@/types/schemas/question-schemas';
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

    const questions: QuestionInfo[] = [
      {
        id: 1,
        topicId: 101,
        type: WidgetType.Quiz,
        isSuccess: false,
        updatedAt: undefined,
        payload: {
          question: { en: 'Q1', ru: 'Q1', by: 'Q1' },
          options: [{ en: 'a', ru: 'a', by: 'a' }],
        },
      },
    ];

    render(
      <QuestionRunnerEngine questions={questions} onComplete={() => {}}>
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
      expect(trackQuestionAttempt).toHaveBeenCalledWith({ questionId: 1, isSuccess: true, userId: 'test-user-uuid' });
    });
  });
  it('calls onComplete and shows results when all questions are answered', async () => {
    const onCompleteMock = jest.fn();
    const user = userEvent.setup();

    const questions: QuestionInfo[] = [
      {
        id: 1,
        topicId: 101,
        type: WidgetType.Quiz,
        isSuccess: false,
        updatedAt: undefined,
        payload: {
          question: { en: 'Q1', ru: 'Q1', by: 'Q1' },
          options: [{ en: 'a', ru: 'a', by: 'a' }],
        },
      },
    ];

    render(
      <QuestionRunnerEngine questions={questions} onComplete={onCompleteMock}>
        {({ nextQuestion }) => <button onClick={nextQuestion}>test</button>}
      </QuestionRunnerEngine>
    );

    const finishButton = screen.getByRole('button', { name: /test/i });
    await user.click(finishButton);

    const redoButton = screen.getByRole('button', { name: /Start Over/i });

    await user.click(redoButton);

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});

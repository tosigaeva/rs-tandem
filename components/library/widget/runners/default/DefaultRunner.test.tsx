import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestionsRunner from '@/components/library/widget/runners/default/DefaultRunner';
import { QuestionInfo } from '@/types/schemas/question-schemas';
import { WidgetType } from '@/types/widget';

const getWidgetComponentMock = jest.fn((_type: WidgetType) => {
  console.log(_type);
  return function MockWidget({ questionId, onNext }: { questionId: string; onNext: () => void }) {
    return <button onClick={() => onNext()}>{questionId}</button>;
  };
});

jest.mock('@/components/library/widget/widget.engine', () => ({
  getWidgetComponent: (type: WidgetType) => getWidgetComponentMock(type),
}));

jest.mock('@/components/Results', () => {
  return function MockResults() {
    return <div data-testid="mock-results">Results Mock</div>;
  };
});

describe('DefaultRunner', () => {
  it('renders questions sequentially and shows results at the end', async () => {
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
      {
        id: 2,
        topicId: 101,
        type: WidgetType.TrueFalse,
        isSuccess: false,
        updatedAt: undefined,
        payload: {
          statement: { en: 'Q2', ru: 'Q2', by: 'Q2' },
          explanation: { en: 'E2', ru: 'E2', by: 'E2' },
        },
      },
    ];

    render(<QuestionsRunner questions={questions} />);

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(getWidgetComponentMock).toHaveBeenCalledWith(WidgetType.Quiz);

    await user.click(screen.getByRole('button', { name: '1' }));
    expect(await screen.findByRole('button', { name: '2' })).toBeInTheDocument();
    expect(getWidgetComponentMock).toHaveBeenCalledWith(WidgetType.TrueFalse);

    await user.click(screen.getByRole('button', { name: '2' }));
    expect(await screen.findByTestId('mock-results')).toBeInTheDocument();
  });
});

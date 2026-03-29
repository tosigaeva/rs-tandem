import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestionsRunner from '@/components/library/widget/runners/default/DefaultRunner';
import { Question } from '@/types/question';
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
    const questions: Question[] = [
      { id: 'q1', topicId: 't1', type: WidgetType.Quiz, payload: { question: 'Q1', options: ['a'] } },
      { id: 'q2', topicId: 't1', type: WidgetType.TrueFalse, payload: { statement: 'Q2', explanation: 'E2' } },
    ];

    render(<QuestionsRunner questions={questions} />);

    expect(screen.getByRole('button', { name: 'q1' })).toBeInTheDocument();
    expect(getWidgetComponentMock).toHaveBeenCalledWith(WidgetType.Quiz);

    await user.click(screen.getByRole('button', { name: 'q1' }));
    expect(await screen.findByRole('button', { name: 'q2' })).toBeInTheDocument();
    expect(getWidgetComponentMock).toHaveBeenCalledWith(WidgetType.TrueFalse);

    await user.click(screen.getByRole('button', { name: 'q2' }));
    expect(await screen.findByTestId('mock-results')).toBeInTheDocument();
  });
});

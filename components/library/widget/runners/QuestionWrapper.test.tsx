import { render, screen } from '@testing-library/react';

import QuestionWrapper from '@/components/library/widget/runners/QuestionWrapper';
import { QuestionPayload } from '@/types/question';

describe('QuestionWrapper', () => {
  it('renders provided widget component with props', () => {
    const WidgetComponent = ({
      questionId,
      questionPayload,
    }: {
      questionId: string;
      questionPayload: QuestionPayload;
    }) => (
      <div data-testid="widget">
        {questionId}:
        {'question' in questionPayload && typeof questionPayload.question === 'string'
          ? questionPayload.question
          : 'payload'}
      </div>
    );

    render(
      <QuestionWrapper
        questionId="q1"
        WidgetComponent={WidgetComponent}
        questionPayload={{ question: 'Test', options: ['a'] }}
        onCheck={async () => ({ isCorrect: true })}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('widget')).toHaveTextContent('q1:Test');
  });
});

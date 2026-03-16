import { render, screen } from '@testing-library/react';

import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
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
        {questionId}:{'question' in questionPayload ? questionPayload.question : 'payload'}
      </div>
    );

    render(
      <QuestionWrapper
        WidgetComponent={WidgetComponent}
        questionId="q1"
        questionPayload={{ question: 'Test', options: ['a'] }}
        onCheck={async () => {}}
      />
    );

    expect(screen.getByTestId('widget')).toHaveTextContent('q1:Test');
  });
});

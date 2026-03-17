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
        {questionId}:{'question' in questionPayload ? questionPayload.question : 'payload'}
      </div>
    );

    render(
      <QuestionWrapper
        questionId="q1"
        WidgetComponent={WidgetComponent}
        questionPayload={{ question: 'Test', options: ['a'] }}
        onCheck={async () => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('widget')).toHaveTextContent('q1:Test');
  });
});

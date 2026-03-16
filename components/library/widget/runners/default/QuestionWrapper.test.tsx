import { render, screen } from '@testing-library/react';

import QuestionWrapper from '@/components/library/widget/runners/default/QuestionWrapper';
import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';

describe('QuestionWrapper', () => {
  it('renders provided widget component with props', () => {
    const WidgetComponent = ({ questionId, questionPayload }: { questionId: string; questionPayload: QuizPayload }) => (
      <div data-testid="widget">
        {questionId}:{questionPayload.question}
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

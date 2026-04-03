import { render, screen } from '@testing-library/react';

import QuestionWrapper from '@/components/library/widget/runners/QuestionWrapper';
import { AnyQuestionPayload } from '@/types/schemas/question-payload-schema';

describe('QuestionWrapper', () => {
  it('renders provided widget component with props', () => {
    const WidgetComponent = ({
      questionId,
      questionPayload,
    }: {
      questionId: number;
      questionPayload: AnyQuestionPayload;
    }) => (
      <div data-testid="widget">
        {questionId}:{'question' in questionPayload ? questionPayload.question.en : 'payload'}
      </div>
    );

    render(
      <QuestionWrapper
        questionId={1}
        WidgetComponent={WidgetComponent}
        questionPayload={{
          question: { en: 'Test', ru: 'Тест', by: 'Тэст' },
          options: [{ en: 'a', ru: 'а', by: 'а' }],
        }}
        onCheck={async () => true}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('widget')).toHaveTextContent('1:Test');
  });
});

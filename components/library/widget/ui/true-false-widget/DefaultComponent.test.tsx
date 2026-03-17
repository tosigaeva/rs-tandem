import { render, screen } from '@testing-library/react';

import DefaultComponent from '@/components/library/widget/ui/true-false-widget/DefaultComponent';

jest.mock('@/components/QuestionCard', () => ({
  __esModule: true,
  default: ({ question, options, instruction }: { question: string; options: string[]; instruction: string }) => (
    <div data-testid="question-card">
      {instruction}|{question}|{options.join(',')}
    </div>
  ),
}));

describe('TrueFalse DefaultComponent', () => {
  it('passes statement and fixed options to QuestionCard', () => {
    render(
      <DefaultComponent
        questionId="q1"
        questionPayload={{ statement: 'Statement', explanation: 'Explanation' }}
        onCheck={async () => {}}
      />
    );

    expect(screen.getByTestId('question-card')).toHaveTextContent('True or False|Statement|true,false');
  });
});

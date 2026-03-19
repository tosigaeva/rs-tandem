import { render, screen } from '@testing-library/react';

import DefaultComponent from '@/components/library/widget/ui/quiz-widget/DefaultComponent';

jest.mock('@/components/QuestionCard', () => ({
  __esModule: true,
  default: ({ question, options, instruction }: { question: string; options: string[]; instruction: string }) => (
    <div data-testid="question-card">
      {instruction}|{question}|{options.join(',')}
    </div>
  ),
}));

describe('Quiz DefaultComponent', () => {
  it('passes payload to QuestionCard', () => {
    render(
      <DefaultComponent
        questionId="q1"
        questionPayload={{ question: 'What?', options: ['a', 'b'] }}
        onCheck={async () => true}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('question-card')).toHaveTextContent('Select one answer|What?|a,b');
  });
});

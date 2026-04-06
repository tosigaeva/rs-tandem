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
        questionId={1}
        questionPayload={{
          statement: {
            en: 'Statement',
            ru: 'Утверждение',
            by: 'Зацвярджэнне',
          },
          explanation: {
            en: 'Explanation',
            ru: 'Объяснение',
            by: 'Тлумачэнне',
          },
        }}
        onCheck={async () => ({ isCorrect: true })}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('question-card')).toHaveTextContent('True or False|Statement|true,false');
  });
});

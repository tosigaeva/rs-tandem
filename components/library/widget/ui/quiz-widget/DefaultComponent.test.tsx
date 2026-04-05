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
        questionId={1}
        questionPayload={{
          question: { en: 'What?', ru: 'Что?', by: 'Што?' },
          options: [
            { en: 'a', ru: 'а', by: 'а' },
            { en: 'b', ru: 'б', by: 'б' },
          ],
        }}
        onCheck={async () => ({ isCorrect: true })}
        onNext={() => {}}
      />
    );

    expect(screen.getByTestId('question-card')).toHaveTextContent('Select one answer|What?|a,b');
  });
});

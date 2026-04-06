import { render, screen } from '@testing-library/react';
import * as React from 'react';

import QuestionCard from '@/components/QuestionCard';

jest.mock('@/components/CodeBlock', () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => <pre>{code}</pre>,
}));

describe('QuestionCard', () => {
  it('is disabled by default', () => {
    render(
      <QuestionCard
        questionId="q1"
        question="What?"
        options={['a', 'b']}
        instruction="Pick one"
        onCheck={async () => ({ isCorrect: true })}
        onNext={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Check Answer' });
    expect(button).toBeDisabled();
  });
});

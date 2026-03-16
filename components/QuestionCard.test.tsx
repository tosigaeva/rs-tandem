import { render, screen } from '@testing-library/react';
import * as React from 'react';

import QuestionCard, { messages } from '@/components/QuestionCard';

jest.mock('@/components/CodeBlock', () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => <pre>{code}</pre>,
}));

describe('QuestionCard', () => {
  it('disables check button until option selected', async () => {
    render(
      <QuestionCard
        questionId="q1"
        question="What?"
        options={['a', 'b']}
        instruction="Pick one"
        onCheck={async () => {}}
      />
    );

    const button = screen.getByRole('button', { name: messages.selectAnOption });
    expect(button).toBeDisabled();
  });
});

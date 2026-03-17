import { render, screen } from '@testing-library/react';

import WidgetCard from '@/components/WidgetCard';
import { WidgetType } from '@/types/widget';

describe('WidgetCard', () => {
  it('renders widget icon, title, and description', () => {
    render(
      <WidgetCard
        widget={{
          type: WidgetType.Quiz,
          icon: 'Q',
          title: 'Quiz',
          description: 'Multiple choice',
        }}
      />
    );

    expect(screen.getByText('Q')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Multiple choice')).toBeInTheDocument();
  });
});

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
          name: {
            en: 'Quiz',
            ru: 'Квиз',
            by: 'Квіз',
          },
          description: {
            en: 'Multiple choice',
            ru: 'Множественный выбор',
            by: 'Множны выбар',
          },
          totalQuestions: 0,
          correctAnswers: 0,
        }}
      />
    );

    expect(document.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Multiple choice')).toBeInTheDocument();
  });
});

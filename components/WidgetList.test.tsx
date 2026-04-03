import { render, screen } from '@testing-library/react';

import WidgetList from '@/components/WidgetList';
import { WidgetType } from '@/types/widget';

describe('WidgetList', () => {
  it('renders widgets plus the All Exercises option', () => {
    render(
      <WidgetList
        topicId="t1"
        widgets={[
          {
            type: WidgetType.Quiz,
            icon: 'Q',
            name: { en: 'Quiz', ru: 'Квиз', by: 'Квіз' },
            description: { en: 'Multiple choice', ru: 'Множественный выбор', by: 'Множны выбар' },
          },
          {
            type: WidgetType.TrueFalse,
            icon: 'T',
            name: { en: 'True/False', ru: 'Верно/Неверно', by: 'Верна/Не' },
            description: { en: 'Select true or false', ru: 'Выберите верно или неверно', by: 'Выберыце верна ці не' },
          },
        ]}
      />
    );

    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('True/False')).toBeInTheDocument();
    expect(screen.getByText('All Exercises')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/library/t1?widgetType=quiz');
    expect(links[1]).toHaveAttribute('href', '/library/t1?widgetType=true-false');
    expect(links[2]).toHaveAttribute('href', '/library/t1?widgetType=all');
  });
});

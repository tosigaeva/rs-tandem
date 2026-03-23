import { render, screen } from '@testing-library/react';

import { TopicCard } from '@/components/library/TopicCard';
import { Locale, useLocale } from '@/services/locale/locale.service';
import { Level, Subject, TopicOverview } from '@/types/schemas/topic-schema';

describe('TopicCard', () => {
  beforeEach(() => {
    useLocale.setState({
      locale: Locale.gb,
    });
  });

  it('renders basic topic fields', () => {
    const topic: TopicOverview = {
      id: 1,
      name: {
        en: 'Variables',
        ru: 'Переменные',
        by: 'Пераменныя',
      },
      level: Level.beginner,
      subject: Subject.javascript,
      description: {
        en: 'let, const, var',
        ru: 'let, const, var',
        by: 'let, const, var',
      },
      progress: 0,
      lastTrainedAt: undefined,
      createdAt: new Date(),
      widgets: [],
    };

    render(<TopicCard topic={topic} displayProgress={false} />);

    expect(screen.getByText('beginner')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('let, const, var')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('renders progress for user topic', () => {
    const topic: TopicOverview = {
      id: 2,
      name: {
        en: 'Promises',
        ru: 'Промисы',
        by: 'Промісы',
      },
      level: Level.intermediate,
      description: {
        en: 'promise, then, catch',
        ru: 'promise, then, catch',
        by: 'promise, then, catch',
      },
      subject: Subject.javascript,
      progress: 42,
      lastTrainedAt: new Date('2026-02-24T18:10:00Z'),
      createdAt: new Date('2026-01-01T12:00:00Z'),
      widgets: [],
    };

    const { container } = render(<TopicCard topic={topic} displayProgress={true} />);

    expect(screen.getByText('intermediate')).toBeInTheDocument();
    expect(screen.getByText('Promises')).toBeInTheDocument();
    expect(screen.getByText('promise, then, catch')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('42.00%')).toBeInTheDocument();
    expect(container.querySelector("[data-slot='progress']")).toBeTruthy();
  });
});

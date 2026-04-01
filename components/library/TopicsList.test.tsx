import { render, screen } from '@testing-library/react';

import { TopicList } from '@/components/library/TopicsList';
import { Level, Subject, TopicOverview } from '@/types/schemas/topic-schema';

describe('TopicList', () => {
  it('renders list of topics with links', () => {
    const topics: TopicOverview[] = [
      {
        id: 1,
        name: { en: 'Variables', ru: 'Переменные', by: 'Пераменныя' },
        level: Level.beginner,
        description: { en: 'desc', ru: 'описание', by: 'апісанне' },
        subject: Subject.javascript,
        progress: 0,
        lastTrainedAt: undefined,
        createdAt: new Date(),
        widgets: [],
      },
      {
        id: 2,
        name: { en: 'Objects', ru: 'Объекты', by: "Аб'екты" },
        level: Level.beginner,
        description: { en: 'desc', ru: 'описание', by: 'апісанне' },
        subject: Subject.javascript,
        progress: 0,
        lastTrainedAt: undefined,
        createdAt: new Date(),
        widgets: [],
      },
    ];

    render(<TopicList title="Explore" topics={topics} />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Objects')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/library/1');
    expect(links[1]).toHaveAttribute('href', '/library/2');
  });
});

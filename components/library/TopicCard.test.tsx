import { render, screen } from '@testing-library/react';

import { TopicCard } from '@/components/library/TopicCard';
import { Topic, UserTopic } from '@/types/topic';

describe('TopicCard', () => {
  it.skip('renders basic topic fields', () => {
    const topic: Topic = {
      id: '1',
      name: 'Variables',
      level: 'beginner',
      description: 'let, const, var',
      subject: 'JavaScript',
    };

    // render(<TopicCard topic={topic} />);

    expect(screen.getByText('beginner')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('let, const, var')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it.skip('renders progress for user topic', () => {
    const topic: UserTopic = {
      id: '2',
      name: 'Promises',
      level: 'intermediate',
      description: 'promise, then, catch',
      subject: 'JavaScript',
      progress: 42,
      lastTrainedAt: '2026-02-24T18:10:00Z',
    };

    // const { container } = render(<TopicCard topic={topic} />);

    expect(screen.getByText('intermediate')).toBeInTheDocument();
    expect(screen.getByText('Promises')).toBeInTheDocument();
    expect(screen.getByText('promise, then, catch')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();
    // expect(container.querySelector("[data-slot='progress']")).toBeTruthy();
  });
});

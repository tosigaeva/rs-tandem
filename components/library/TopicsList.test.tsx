import { render, screen } from '@testing-library/react';

import { TopicList } from '@/components/library/TopicsList';
import { Topic } from '@/types/topic';

describe('TopicList', () => {
  it.skip('renders list of topics with links', () => {
    const topics: Topic[] = [
      { id: '1', name: 'Variables', level: 'beginner', description: 'desc', subject: 'JS' },
      { id: '2', name: 'Objects', level: 'beginner', description: 'desc', subject: 'JS' },
    ];
    // render(<TopicList title="Explore" topics={topics} />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Objects')).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/library/1');
    expect(links[1]).toHaveAttribute('href', '/library/2');
  });
});

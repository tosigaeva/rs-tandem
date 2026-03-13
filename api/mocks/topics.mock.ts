import { Topic, UserTopic } from '@/types/topic';

export const mockUserTopics: UserTopic[] = [
  {
    id: '1',
    name: 'Conditional Statements',
    level: 'beginner',
    description: 'if, else if, else, ternary operator if, else if, else, ternary operator',
    subject: 'JavaScript',
    progress: 15,
    lastTrainedAt: '2026-02-21T09:30:00Z',
  },
  {
    id: '2',
    name: 'Arrays Advanced',
    level: 'intermediate',
    description: 'map, filter, reduce, some, every, find',
    subject: 'JavaScript',
    progress: 80,
    lastTrainedAt: '2026-02-24T18:10:00Z',
  },
  {
    id: '3',
    name: 'Asynchronous Patterns',
    level: 'intermediate',
    description: 'callbacks, promises, async/await',
    subject: 'JavaScript',
    progress: 45,
    lastTrainedAt: '2026-02-23T07:45:00Z',
  },
];

export const mockTopics: Topic[] = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  name: `Topic ${index + 1}`,
  level: index % 3 === 0 ? 'beginner' : index % 3 === 1 ? 'intermediate' : 'advanced',
  description: `Description for topic ${index + 1}`,
  subject: 'JavaScript',
}));

import { Paginated } from '@/types/pagination';

export type Topic = {
  id: string;
  name: string;
  level: string;
  description: string;
  subject: string;
};

export type UserTopic = Topic & {
  progress: number;
  lastTrainedAt: string;
};

export type LibraryTopicsResponse = {
  userTopics: UserTopic[];
  topics: Paginated<Topic>;
};

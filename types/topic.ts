export type Topic = {
  id: string;
  name: string;
  level: string;
  description: string;
  subject: string;
};

export type UserTopic = Topic & {
  progress: string;
  lastTrainedAt: string;
};

export type TopicsResponse = {
  userTopics: UserTopic[];
  topics: Topic[];
  currentPage: number;
  totalPages: number;
};

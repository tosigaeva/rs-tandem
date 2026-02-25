export type Topic = {
  id: string;
  name: string;
  level: string;
  description: string;
  tag: string;
};

export type UserTopic = Topic & {
  progress: string;
  lastTrainingTime: string;
};

export type TopicsResponse = {
  userTopics: UserTopic[];
  topics: Topic[];
  currentPage: number;
  totalPages: number;
};

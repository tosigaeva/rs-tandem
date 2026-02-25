export type Topic = {
  id: string;
  name: string;
  level: string;
  description: string;
  tag: string;
  progress?: string;
};

export type UserTopic = {
  id: string;
  topicId: string;
  progress: string;
};

export type Question = {
  id: string;
  payload: LearningPayload;
};

type LearningPayload = {
  question: string;
  correctAnswer: string;
};

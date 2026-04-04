import { ValidationStrategy } from './types';

export const flipCardValidationStrategy: ValidationStrategy = {
  validate: async () => ({ isCorrect: undefined }),
};

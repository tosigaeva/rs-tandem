import { ValidationQuestion } from '@/data/supabase/validate.supabase';

export type ValidationStrategyContext = {
  answer: unknown;
  question: ValidationQuestion;
};

export type ValidationStrategy = {
  validate: (context: ValidationStrategyContext) => Promise<boolean | undefined>;
};

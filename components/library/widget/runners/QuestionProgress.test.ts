import { calculateCurrentStreak } from '@/components/library/widget/runners/QuestionProgress';
import { AnswersHistory } from '@/components/library/widget/runners/QuestionRunnerEngine';

describe('calculateCurrentStreak', () => {
  it('returns the max consecutive run of true answers', () => {
    const answersHistory: AnswersHistory = [true, false, true, true, true];

    expect(calculateCurrentStreak(answersHistory)).toBe(3);
  });

  it('keeps the longest streak before a false answer', () => {
    const answersHistory: AnswersHistory = [true, true, false];

    expect(calculateCurrentStreak(answersHistory)).toBe(2);
  });

  it('ignores trailing unanswered questions after the longest streak', () => {
    const answersHistory: AnswersHistory = [true, false, true, true, undefined, undefined];

    expect(calculateCurrentStreak(answersHistory)).toBe(2);
  });

  it('returns all consecutive true answers when there is no false answer', () => {
    const answersHistory: AnswersHistory = [undefined, true, true, true];

    expect(calculateCurrentStreak(answersHistory)).toBe(3);
  });
});

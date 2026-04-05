'use server';

import { supabaseServer } from '@/lib/supabase/server';

type TrackQuestionAttemptProperties = {
  questionId: number;
  userId: string;
  isSuccess: boolean | undefined;
};

export async function trackQuestionAttempt({
  questionId,
  userId,
  isSuccess,
}: TrackQuestionAttemptProperties): Promise<void> {
  const supabase = await supabaseServer();

  const { error } = await supabase.from('profile_questions').upsert(
    {
      user_id: userId,
      question_id: questionId,
      is_success: isSuccess ?? false,
    },
    {
      onConflict: 'user_id,question_id',
    }
  );
  if (error != undefined) {
    throw new Error(error.message);
  }
}

'use server';

import { toPositiveInteger } from '@/lib/parse-id';
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

  console.log('Trying to upsert:', {
    user_id: userId,
    question_id: questionId,
    is_success: isSuccess ?? false,
  });
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
  console.log('Upsert result:', { error });
  if (error != undefined) {
    throw new Error(error.message);
  }
}

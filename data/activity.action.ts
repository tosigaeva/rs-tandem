'use server';

import { toPositiveInteger } from '@/lib/parse-id';
import { supabaseServer } from '@/lib/supabase/server';

type TrackQuestionAttemptProperties = {
  questionId: string;
  isSuccess: boolean | undefined;
};

export async function trackQuestionAttempt({ questionId, isSuccess }: TrackQuestionAttemptProperties): Promise<void> {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError != undefined || user == undefined) {
    return;
  }

  let questionValue = toPositiveInteger(questionId);
  console.log('questionId:', questionId);
  console.log('parsed:', questionValue);
  if (questionValue === undefined) {
    const { data: fallbackQuestion, error: questionError } = await supabase
      .from('questions')
      .select('id')
      .limit(1)
      .single();

    if (questionError != undefined || fallbackQuestion == undefined) {
      throw new Error(questionError?.message ?? 'Could not resolve fallback question id');
    }

    questionValue = fallbackQuestion.id;
  }
  console.log('Trying to upsert:', {
    user_id: user.id,
    question_id: questionValue,
    is_success: isSuccess ?? false,
  });
  const { error } = await supabase.from('profile_questions').upsert(
    {
      user_id: user.id,
      question_id: questionValue,
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

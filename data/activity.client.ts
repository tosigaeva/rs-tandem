import { toPositiveInteger } from '@/lib/parse-id';
import { supabaseBrowser } from '@/lib/supabase/client';

type TrackQuestionAttemptProperties = {
  questionId: string;
  isSuccess: boolean | undefined;
};

export async function trackQuestionAttempt({ questionId, isSuccess }: TrackQuestionAttemptProperties): Promise<void> {
  const supabase = supabaseBrowser();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError != undefined || user == undefined) {
    return;
  }

  let questionValue = toPositiveInteger(questionId);

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

  const { error } = await supabase.from('profile_questions').insert({
    user_id: user.id,
    question_id: questionValue,
    is_success: isSuccess ?? false,
  });

  if (error != undefined) {
    throw new Error(error.message);
  }
}

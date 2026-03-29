import { z } from 'zod';

import { supabaseBrowser } from '@/lib/supabase/client';
import { QuestionAdminListItem, QuestionAdminListItemSchema } from '@/types/schemas/question-schemas';

export async function getAllQuestions(): Promise<{
  data: QuestionAdminListItem[] | undefined;
  error?: string;
}> {
  try {
    const supabase = await supabaseBrowser();

    const { data, error } = await supabase.from('question_admin_list').select('*');

    if (error != undefined) {
      throw error;
    }

    if (data != undefined) {
      const array = z.array(QuestionAdminListItemSchema).safeParse(data);

      if (array.success) {
        return { data: array.data };
      } else {
        throw new Error('Failed to correctly parse data from server');
      }
    }

    throw new Error('Something went wrong');
  } catch (error: unknown) {
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}

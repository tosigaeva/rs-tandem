import z from 'zod';

import type { ActivityDay } from '@/components/dashboard/activity/activity.types';
import { supabaseServer } from '@/lib/supabase/server';

const activityViewRowSchema = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  count: z.number().int().nonnegative(),
});

const activityDaysSchema = z.array(
  z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    count: z.number().int().nonnegative(),
  })
);

type ActivityViewRow = z.infer<typeof activityViewRowSchema>;

export async function getDailyActivity(limit = 120): Promise<{ data: ActivityDay[] | undefined; error?: string }> {
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (user == undefined) {
      return { data: [] };
    }

    const { data, error } = await supabase
      .from('profile_questions_daily_activity')
      .select('day, count')
      .eq('user_id', user.id)
      .order('day', { ascending: true })
      .limit(limit);

    if (error) {
      throw error;
    }

    if (data == undefined || data.length === 0) {
      return { data: [] };
    }

    const rows = z.array(activityViewRowSchema).safeParse(data);

    if (!rows.success) {
      throw new Error('Invalid profile_questions_daily_activity format');
    }

    const days: ActivityDay[] = rows.data.map((row: ActivityViewRow) => ({
      date: row.day,
      count: row.count,
    }));

    const parsed = activityDaysSchema.safeParse(days);

    if (!parsed.success) {
      throw new Error('Invalid activity day format');
    }

    return { data: parsed.data };
  } catch (error: unknown) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

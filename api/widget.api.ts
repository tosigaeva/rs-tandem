import z from 'zod';

import { mockWidgets } from '@/api/mocks/widget.mock';
import { supabaseBrowser } from '@/lib/supabase/client';
import { WidgetAdminListItem, WidgetAdminListItemSchema } from '@/types/schemas/widget-schema';
import { Widget } from '@/types/widget';

export async function getWidgetsByTopic(topicId: string): Promise<Widget[]> {
  console.log(topicId); //TODO: must be deleted. added to pass the linter check
  return mockWidgets;
}

export async function getAllWidgets(): Promise<{ data: WidgetAdminListItem[] | undefined; error?: string }> {
  try {
    const supabase = await supabaseBrowser();

    const { data, error } = await supabase.from('widget_admin_list').select('*');

    if (error != undefined) {
      throw error;
    }

    if (data != undefined) {
      console.log('widgets', data);

      const array = z.array(WidgetAdminListItemSchema).safeParse(data);

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

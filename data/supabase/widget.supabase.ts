import { supabaseServer } from '@/lib/supabase/server';
import { Widget } from '@/types/widget';

export async function getWidgets(topicId: string): Promise<Widget[]> {
  const supabase = await supabaseServer();

  const query = supabase
    .from('topic_widgets')
    .select(
      `
    widget_type,
    widgets (
      name,
      description,
      icon
    )
  `
    )
    .eq('topic_id', topicId);

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  if (data === null) {
    return [];
  }

  return data.map(({ widget_type, widgets }) => ({
    type: widget_type,
    title: widgets[0]?.name,
    description: widgets[0]?.description,
    icon: widgets[0]?.icon(),
  }));
}

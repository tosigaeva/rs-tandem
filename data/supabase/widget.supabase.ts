import { supabaseServer } from '@/lib/supabase/server';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { Widget } from '@/types/widget';

export async function getWidgets(topicId: string): Promise<Widget[]> {
  const supabase = await supabaseServer();
  const languageCode = await getServerLanguageCode();

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
    title: widgets.name[languageCode],
    description: widgets.description[languageCode],
    icon: widgets.icon,
  }));
}
